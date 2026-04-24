import puppeteer from "puppeteer";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import generatedURLs from "../generatedURLs/index.js";
import { testingWAR } from "../helper/testingWAR.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function checkWAR(extensionName,url = "http://extensionsv3.antreaschrist.com/"
) {
const extensionPath = resolve(__dirname, "../extensions", extensionName);
const resources = generatedURLs[extensionName] || [];

const browser = await puppeteer.launch({
    headless: false,
    pipe: true,
    enableExtensions: [extensionPath],
});

try {
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2",});
    const results = await testingWAR(page, extensionName, resources);
    return results;
} finally {
    await browser.close();
}
}