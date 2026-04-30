import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"


export function clearWildCards(rawpath,identity){
    //remove the chrome-extension id from the path and get te real path to the file
    const findPath = rawpath.replace(/^chrome-extension:\/\/[^/]+\//,"");
    const originalPath = fileURLToPath(new URL(`../extensions/${identity}/`, import.meta.url));


    try{
    //if the path contains wildcard ** go back and get all the files and folders in the path
    if(rawpath.includes("/**")){
        const basePath = findPath.split("/**")[0];
        const fullPath = path.join(originalPath, basePath);
        return finalPath(fullPath,originalPath); //exapnd the /** and return it then in the generateURLs
        //pass the created path again and do it recursively until no more wildcards are found.
    }

    //if the path contains a wildcad * expand it and add it
    //if path is like /**/*.css get the base path and the file pattern and expand it
    if(findPath.includes("*") && !findPath.includes("/**")){
        const basePath = path.dirname(findPath) === "." ? "" : path.dirname(findPath);
        const filePattern = path.basename(findPath);
        const fullPath = path.join(originalPath, basePath);
        const matcher = new RegExp("^" + filePattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
        const files = fs.readdirSync(fullPath, {withFileTypes: true });
        const expandPaths = files
            .filter(file => file.isFile() && matcher.test(file.name))
            .map(file => path.join(basePath, file.name).replace(/\\/g, "/"));
        return expandPaths;
    }

    return [rawpath];

    }catch(error){
        console.warn("Could not read WildCart path: " , error.message);
        return false
    }
}
