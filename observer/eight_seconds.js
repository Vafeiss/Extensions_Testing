import puppeteer from "puppeteer";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { get_differences_between_strings } from '../helper/dom_diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {

    const no_extension_browser =  await puppeteer.launch({
        headless: false});

    const page = await no_extension_browser.newPage();
    await page.goto("https://example.com", {waitUntil: "domcontentloaded" });
    const dom = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync("CleanDOM", dom);
    await no_extension_browser.close();

    const extensionPath = resolve(__dirname, "../InjectScript");

    const extension_browser = await puppeteer.launch({
        headless: false, args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,]
    });

    const extension_page = await extension_browser.newPage();
    await extension_page.goto("https://example.com", {waitUntil: "domcontentloaded" });

    await new Promise(resolve => setTimeout(resolve, 8000));
    const modified_dom = await extension_page.evaluate(() => document.documentElement.outerHTML);

    fs.writeFileSync("ModifiedDOM", modified_dom);

    await extension_browser.close();
    const result = get_differences_between_strings(dom, modified_dom);
    console.log("Added: ", result.added);
    console.log("Removed:", result.removed);

})();