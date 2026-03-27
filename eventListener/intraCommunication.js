import puppeteer from "puppeteer";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { getExtensionName } from "../helper/getExtensionName.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensions = [
  "nkbihfbeogaeaoehlefnkodbefgpgknn/13.22.0_0",
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

for (var extensionName of extensions) {
  const name = getExtensionName(extensionName);
  console.log(name);

  const extensionPath = resolve(__dirname, "../extensions/" + extensionName);

  const url = " http://extensionsv3.antreaschrist.com/";

  const extension_browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });

  const extensionPage = await extension_browser.newPage();

  await extensionPage.evaluateOnNewDocument(() => {
    window.addEventListener("message", (event) => {
      console.log({
        origin: event.origin,
        data: event.data,
      });
    });
  });

  /**
   * Get all console messages and map them to a json
   */

  extensionPage.on("console", async (msg) => {
    var values = [];

    for (const arg of msg.args()) {
      try {
        values.push(await arg.jsonValue());
      } catch {
        values.push(arg);
      }
    }

    console.log(...values);
  });



  await extensionPage.goto(url, { waitUntil: "domcontentloaded" });

  await new Promise((resolve) => setTimeout(resolve, 8000));

  extension_browser.close();
}
