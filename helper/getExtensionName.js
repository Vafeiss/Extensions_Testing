import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getExtensionName(identity) {

  /**
   * Try to find manifest
   */
  var manifestPath = fileURLToPath(
    new URL(`../extensions/${identity}/manifest.json`, import.meta.url),
  );

  try {

    /**
     * If name includes MSG then it is not the actual name
     * Find the fodler which contains the english name and extract it
     */
    var data = fs.readFileSync(manifestPath, "utf-8");
    var name = JSON.parse(data).name;

    if (name.includes("MSG")) {
      var noMSG = name.replace("MSG", "");
      var temp = noMSG.replace(/^_+/, "").replace(/_+$/, "");
     
      /**
       * Find the first folder that includes en
       */
      var folders = fs.readdirSync(
        path.join(__dirname, "../extensions", identity, "_locales"),
      );
    
      var folderName;
      for (var folder of folders) {
        if (folder.includes("en")) {
          folderName = folder;
          break;
        }
      }

      /**
       * Find path of json and read it
       */
      manifestPath = fileURLToPath(
        new URL(
          `../extensions/${identity}/_locales/${folderName}/messages.json`,
          import.meta.url,
        ),
      );
      data = fs.readFileSync(manifestPath, "utf-8");
    
      // Match the MSG Json property to any property with same name 
      const parsedData = JSON.parse(data);

      const matchKey = Object.keys(parsedData).find(
        (key) => key.toLowerCase() === String(temp).trim().toLowerCase(),
      );

      //Return name
      return parsedData[matchKey]?.message;

    } 
    //Name doesnt include MSG is returned immediately
    else return name;
  } catch (error) {
    return "Undefined"
  }
}
