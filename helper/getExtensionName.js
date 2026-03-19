import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

export function getExtensionName(identity) {
    const manifestPath = fileURLToPath(
        new URL(`../extensions/${identity}/manifest.json`, import.meta.url)
    );
    try {
        const data = fs.readFileSync(manifestPath, "utf-8");
        return JSON.parse(data).name;
    } catch (error) {
        console.log(error);
    }

}