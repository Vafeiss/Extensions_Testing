import {checkWAR} from "./observer/WARcheck.js";
import {getExtensionName} from "./helper/getExtensionName.js";
import {testResources} from "./helper/testingWAR.js";
import fs from "fs";


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

for (const extension of extensions) {
	try {
		const name = getExtensionName(extension);
		console.log(name);
		const safeName = name.replace(/[<>:"/\\|?*]/g, "_");

		const results = await checkWAR(extension, name);

		console.log("War check finished");
		if (results) {
			console.log(JSON.stringify(results, null, 2));
			fs.mkdirSync("./WARresults", {recursive: true});
			fs.writeFileSync(`./WARresults/${safeName}.txt`, JSON.stringify(results, null, 2), "utf8");
		} else {
			console.log("No results for extension: " + name);
		}
		console.log("--------------------------------------------------");
		console.log("--------------------------------------------------");

	} catch (error) {
		console.error("Error during WAR check:", error);
	}
}
