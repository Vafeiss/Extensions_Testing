import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function getExtensionName(identity) {
  var manifestPath = fileURLToPath(
    new URL(`../extensions/${identity}/manifest.json`, import.meta.url),
  );
  try {
    var data = fs.readFileSync(manifestPath, "utf-8");
    var name = JSON.parse(data).name;
    if (name.includes("MSG")) {
      manifestPath = fileURLToPath(
        new URL(
          `../extensions/${identity}/_locales/en/messages.json`,
          import.meta.url,
        ),
      );
      data = fs.readFileSync(manifestPath, "utf-8");

      name = JSON.parse(data).appName.message;
      if (name != null) return name;
      else return "undefined";
    } else {
      return name;
    }
  } catch (error) {
    console.log(error);
  }
}
