import {analyzeExtensionChanges} from "./analyzeDOMs.js";
import {createFingerprint} from "./helper/createFingerprint.js";


const extensionName = "clockext";
const result = await analyzeExtensionChanges(extensionName);
console.log("Final Fingerprint\n" + createFingerprint(result));