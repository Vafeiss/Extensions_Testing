import puppeteer from "puppeteer";
import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { get_differences_between_strings } from '../helper/dom_diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function compare_dom_with_extension(extension_name, url = "https://example.com") {

    const no_extension_browser = await puppeteer.launch({
        headless: true
    });

    const page = await no_extension_browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const dom = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync("CleanDOM", dom);

    await no_extension_browser.close();

    const extension_path = resolve(__dirname, "../extensions/" + extension_name);

    const extension_browser = await puppeteer.launch({
        headless: true,
        args: [
            `--disable-extensions-except=${extension_path}`,
            `--load-extension=${extension_path}`,
        ]
    });

    const extension_page = await extension_browser.newPage();
    await extension_page.goto(url, { waitUntil: "domcontentloaded" });

    await new Promise(resolve => setTimeout(resolve, 8000));

    const modified_dom = await extension_page.evaluate(() => document.documentElement.outerHTML);

    fs.writeFileSync("ModifiedDOM", modified_dom);

    await extension_browser.close();

    return get_differences_between_strings(dom, modified_dom);
}