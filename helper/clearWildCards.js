import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resources = [];

export function clearWildCards(rawpath,identity){
    const originalPath = fileURLToPath(new URL(`../extensions/${identity}/${findPath}`, import.meta.url));
    //try and get previous file before wildcart
    const findPath = rawpath.replace(/^chrome-extension:\/\/[^/]+\//,"").replace(/\/\*?$/,"");

    try{
    if(rawpath.includes("/**")){
        const basePath = findPath.split("/**")[0];
        const fullPath = path.join(originalPath, basePath);
        return finalPath(fullPath,originalPath);
    }

    if(rawpath.replace(/^chrome-extension:\/\/[^/]+\//,"").endsWith("/*")){
        const basePath = findPath.replace(/\/\*$/,"");
        const fullPath = path.join(originalPath, basePath);
        const files = fs.readdirSync(originalPath, {withFileTypes: true });
        const expandPaths = files.filter(file => file.isFile()).map(file => `${findPath}/${file.name}`);
        return expandPaths;
    }

    return [rawpath];

    }catch(error){
        console.warn("Could not read WildCart path: " , error.message);
        return false
    }
}
