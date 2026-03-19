import {analyzeExtensionChanges} from "./analyzeDOMs.js";
import {createFingerprint} from "./helper/createFingerprint.js";
import {insert} from "./database/insert.js";
import {getFingerprints} from "./database/getFingerprint.js";
import {getExtension} from "./database/getExtension.js";
import {connect} from "./database/connect.js";

const conn = await connect();
const extensions = ["clockext"]
for (const extension of extensions) {
    const result = await analyzeExtensionChanges(extension);
    const fingerprints = createFingerprint(result);

    await insert(conn,extension, fingerprints);
    console.log("\nFingerprint: " + await getFingerprints(conn,extension));
    console.log("\nName: " + await getExtension(conn,fingerprints));
}

conn.end();
