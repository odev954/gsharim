import * as fs from "fs";
import { join } from 'path';

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

function main() {
    const source = fs.readFileSync(join(__dirname, "../package.json")).toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    sourceObj.publishConfig = {};
    if (sourceObj.main.startsWith("lib/")) {
        sourceObj.main = sourceObj.main.slice(5);
    }
    fs.writeFileSync(join(__dirname, "/package.json"), Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8") );
    fs.copyFileSync(join(__dirname, "../.npmignore"), join(__dirname, "/.npmignore"));
    fs.copyFileSync(join(__dirname, "../README.md"), join(__dirname, "/README.md"));
}

main();