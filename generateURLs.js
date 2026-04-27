/*This file is responsible for Generating the URLs requests for the WAR fingerprinting process. */
/*Idea: chrome-extension://<extension-id>/path/to/resource generate those urls and store them,
if a URL that generates doesnt have the same id as the extension means it uses Dynamic URL
or if cant generate the URL means it uses matches: for a specific website */

import fs from "fs";
import { connect } from "./database/connect.js"; /* NOT YET IMPLEMENTED */
import { getExtensionName } from "./helper/getExtensionName.js";
import { getResources } from "./helper/getWARURL.js";

// const conn = await connect(); /* NOT YET IMPLEMENTED */
const extensions = [
    "difoiogjjojoaoomphldepapgpbgkhkb/5.25.8_0",
    "eiimnmioipafcokbfikbljfdeojpcgbh/7.0.0_0",
    "eimadpbcbfnmbkopoojfekhnkhdbieeh/4.9.121_0",
    "ghbmnnjooekpmoecnnnilnnbdlolhkhi/1.101.1_0",
    "gighmmpiobklfepjocnamgkkbiglidom/6.37.1_0",
    "heifjnlfhcndklgdnbjkailkipkfgkpm/2.9_0",
    "nllcnknpjnininklegdoijpljgdjkijc/9.19.0_0",
    "nmmhkkegccagdldgiimedpiccmgmieda/1.0.0.6_0",
    "oppflpnigmhkldmdmmbnopidlhahanji/2.2.36_0",
];

for (const identity of extensions) {
    /*
     * Read the name from manifest.jsons
     */
    const name = getExtensionName(identity);
    console.log(name);

    /*
     * Get resources from the manifest.json and generate the URLs for the
     * WAR fingerprinting process, then store them in a text file.
     */
    const paths = getResources(identity);
    if (paths.length === 0) {
        console.log(`No WAR resources for ${identity}, skipping insertion.`);
        continue;
    }
    const extensionId = identity.split("/")[0];
    const urls = paths.map(path => `chrome-extension://${extensionId}/${path}`);
    //await insertURL(conn, identity, name, urls.join("\n")); /* NOT YET IMPLEMENTED */
    /* Store the generated URLs in a text file first then implemtend DB(In progress) */
    fs.mkdirSync("./generatedURLs", { recursive: true });
    fs.writeFileSync(
        `./generatedURLs/${extensionId}.txt`,
        urls.map(String).join("\n"),
        "utf8"
    );
    console.log(`Generated URLs for ${identity}:`, urls);
}