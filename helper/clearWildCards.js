import fs from fs
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resources = [];

export function clearWildCards(path,identity){
    //try and get previous file before wildcart
    const findPath = path.replace(/^chrome-extension:\/\/[^/]+\//,"").replace(/\/\*$/,"");
    var originalPath = fileURLToPath(new URL(`../extensions/${identity}/${findPath}`), import.meta.url);

    try{
        const files = fs.readdirSync(originalPath, {withFileTypes: true });

        const expandPaths = files.filter(file => file.isFile()).map(file =>`${findPath}/${file.name}`);
        return expandPaths
    }catch(error){
        console.warn("Could not read WildCart path")
        return false
    }
}


