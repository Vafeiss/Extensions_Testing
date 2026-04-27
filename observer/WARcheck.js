import puppeteer from "puppeteer";
import {resolve, dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import {testResources} from "../helper/testingWAR.js";
import {testResourcesDirectly} from "../helper/testingWARDirectly.js";


function fetchgeneratedURLs(extensionID) {
	return resolve(__dirname, "../generatedURLs", `${extensionID}.txt`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function checkWAR(extensionID, extensionName, url = "http://extensionsv3.antreaschrist.com/") {
	const cleanExtensionID = extensionID.split("/")[0];

	console.log(`Checking WAR for extension: ${extensionName} (${cleanExtensionID})`);
	const warpath = resolve(__dirname, "../generatedURLs/" + cleanExtensionID + ".txt");
	if (!fs.existsSync(warpath)) {
		console.error("No WAR fingerprinting found for extension: " + extensionName + " (" + cleanExtensionID + ")");
		return;
	}

	const resourcesText = fs.readFileSync(resolve(warpath), "utf-8");
	const resources = resourcesText.split(/\r?\n/).filter((line) => line.trim() !== "").filter(line => !line.includes("*"));

	console.log('resources: ', resources);
	console.log(`Testing ${
		resources.length
	} resources for extension: ${extensionName} (${cleanExtensionID})`);

	const extensionPath = resolve(__dirname, "../extensions/" + extensionID);

	const extension_browser = await puppeteer.launch({
		headless: false,
		args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`,]
	});

	try {
		const page = await extension_browser.newPage();
		await page.goto(url, {waitUntil: "networkidle2"});
		const results = await testResources(page, cleanExtensionID, extensionName, resources);//fetch approach
		const results2 = await testResourcesDirectly(extension_browser, cleanExtensionID, extensionName, resources); //direct approach 
		return results
	} finally {
		await extension_browser.close();
	}
}
