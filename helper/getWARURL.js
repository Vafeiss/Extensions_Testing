import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getResources(identity) {
    /*try to get the manifest and extract the WAR resources into an array list and return it */
    var manifestPath = fileURLToPath(
        new URL(`../extensions/${identity}/manifest.json`, import.meta.url),
    );

    try{
        const manifestContent = fs.readFileSync(manifestPath, "utf8");
        const manifest = JSON.parse(manifestContent);
        const WAR = manifest.web_accessible_resources || [];
        /* If WAR has matches or use_dynamic_url then it means it uses methods against fingerprinting so skip it */
        if (WAR === "matches") {
            console.log(`Extension ${identity} uses matches for web_accessible_resources, skipping URL generation.`);
            return [];
        }
        if (WAR === "use_dynamic_url"){
            console.log(`Extension ${identity} uses dynamic URLs for web_accessible_resources, skipping URL generation.`);
            return [];
        }
        const resourcePaths = WAR.flatMap(entry =>Array.isArray(entry.resources) ? entry.resources : []);
        return resourcePaths;
    } catch (error) {
        console.error(`Error reading manifest for ${identity}:`, error);
        return [];
    }


}