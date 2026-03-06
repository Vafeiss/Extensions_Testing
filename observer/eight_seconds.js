const puppeteer = require("puppeteer");
const fs = require("fs");
const {resolve} = require("node:path");
(async () => {

    const no_extension_browser =  await puppeteer.launch({
        headless: false});

    const page = await no_extension_browser.newPage();
    await page.goto("https://example.com", {waitUntil: "domcontentloaded" });
    const dom = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync("CleanDOM", dom);
    console.log("OK cl");
    await no_extension_browser.close();

    const extensionPath = resolve(__dirname, "../backgroundChanger");

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
    console.log("DOM Change detected!");
    console.log("OK ex");

})();