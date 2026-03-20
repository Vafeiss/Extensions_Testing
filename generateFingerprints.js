import { analyzeExtensionChanges } from "./analyzeDOMs.js";
import { createFingerprint } from "./helper/createFingerprint.js";
import { insert } from "./database/insert.js";
import { getFingerprints } from "./database/getFingerprint.js";
import { getExtension } from "./database/getExtension.js";
import { connect } from "./database/connect.js";
import { getExtensionName } from "./helper/getExtensionName.js";

const conn = await connect();
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
  /**
   * Read the name from manifest.json
   */
  const name = getExtensionName(identity);
  console.log(name);

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
  if (fingerprint.length <= 5) {
    await insert(conn, identity, name, "No DOM Changes");

    continue;
  }

  /**
   * Insert details in DB
   */
  await insert(conn, identity, name, fingerprint);

  //Validation
  console.log("\nFingerprint: " + (await getFingerprints(conn, identity)));
  console.log("\nName: " + (await getExtension(conn, fingerprint)));
}

conn.end();
