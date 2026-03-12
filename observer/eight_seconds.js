import puppeteer from "puppeteer";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { diffStrings } from '../helper/dom_diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function compareDOMs(extensionName, url = "https://example.com") {

    const noExtensionBrowser = await puppeteer.launch({
        headless: true
    });

    const page = await noExtensionBrowser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const originalDOM = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync("CleanDOM", originalDOM);

    await noExtensionBrowser.close();

    const extensionPath = resolve(__dirname, "../extensions/" + extensionName);

    const extension_browser = await puppeteer.launch({
        headless: true,
        args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,
        ]
    });

    const extensionPage = await extension_browser.newPage();
    await extensionPage.goto(url, { waitUntil: "domcontentloaded" });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const modifiedDOM = await extensionPage.evaluate(() => document.documentElement.outerHTML);

    fs.writeFileSync("ModifiedDOM", modifiedDOM);

    await extension_browser.close();

    return diffStrings(originalDOM, modifiedDOM);
}