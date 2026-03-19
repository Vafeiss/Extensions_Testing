import {analyzeExtensionChanges} from "./analyzeDOMs.js";
import {createFingerprint} from "./helper/createFingerprint.js";
import {insert} from "./database/insert.js";
import {getFingerprints} from "./database/getFingerprint.js";
import {getExtension} from "./database/getExtension.js";
import {connect} from "./database/connect.js";
import {getExtensionName} from "./helper/getExtensionName.js";

const conn = await connect();
const extensions = ["clockext","backgroundChanger", "ChangeWords"]
for (const identity of extensions) {
    /**
     * Read the name from manifest.json
     */
    const name = getExtensionName(identity);
    console.log(name)

    /**
     * Analyze DOM with and without extension
     * Remove any dynamic content
     * Create a single string fingerprint
     */
    const result = await analyzeExtensionChanges(identity);
    const fingerprint = createFingerprint(result);

    /**
     * Ensure that a fingerprint was generated
     */
    if (fingerprint.length <= 2) {
        console.log("Fingerprint not found.");
        continue
    }

    /**
     * Insert details in DB
     */
    await insert(conn,identity,name, fingerprint);

    //Validation
    console.log("\nFingerprint: " + await getFingerprints(conn,identity));
    console.log("\nName: " + await getExtension(conn,fingerprint));
}

conn.end();
