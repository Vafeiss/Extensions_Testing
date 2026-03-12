import {resolve, dirname} from "path";
import {fileURLToPath} from "url";
import {compare_dom_with_extension} from './observer/eight_seconds.js';
import * as url from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testExtension(extensionName) {
    console.log("Running for extension: ", extensionName);

    for (let i = 1; i <= 3; i++) {

        const result = await compare_dom_with_extension(extensionName);

        if (!result) {
            console.log("No result returned");
            continue;
        }

        console.log("\niteration #",i)
        console.log("Added:", result.added);
        console.log("Removed:", result.removed);
    }

}

const extensionName = "clockext";
await testExtension(extensionName);
