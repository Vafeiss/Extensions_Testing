import puppeteer from "puppeteer";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";
import {testResources} from "../helper/testingWAR.js";


function fetchgeneratedURLs(extensionID) {
	return resolve(__dirname, "../generatedURLs", `${extensionID}.txt`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function checkWAR(extensionID,extensionName, url = "http://extensionsv3.antreaschrist.com/") {
	const resources = fetchgeneratedURLs(extensionID) || [];

	console.log(`Testing ${resources.length} resources for extension: ${extensionID}`);

	const extensionPath = resolve(__dirname, "../extensions/" + extensionID);

 const extension_browser = await puppeteer.launch({
        headless: true,
        args: [
            `--disable-extensions-except=${extensionPath}`,
            `--load-extension=${extensionPath}`,
        ]
    });


	try {
		const page = await extension_browser.newPage();
		await page.goto(url, {waitUntil: "networkidle2"});
		const results = await testResources(page, extensionID,extensionName, resources);
		return results;
	} finally {
		await extension_browser.close();
	}
}
