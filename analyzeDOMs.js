import {resolve, dirname} from "path";
import {fileURLToPath} from "url";
import {compareDOMs} from './observer/eight_seconds.js';
import {filterDynamicContent} from "./helper/filterDynamicContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function analyzeExtensionChanges(extensionName) {
    console.log("Running for extension: ", extensionName);

    let runs = []

    //Run 3 times
    for (let i = 1; i <= 3; i++) {


        const result = await compareDOMs(extensionName);

        if (!result) {
            console.log("No result returned");
            continue;
        }

        runs.push(result);

        console.log("\niteration #",i)
        console.log("Added:", result.added);
        console.log("Removed:", result.removed);
    }

    //Filter to remove all dynamic content
    let final = filterDynamicContent(runs[0], runs[1], runs[2])

    console.log("\nFinal Result: ");
    console.log("Added:", final.added);
    console.log("Removed:", final.removed);

}


