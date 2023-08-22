#!/usr/bin/env node  
// The above written command signifies the environment where the script needs to be executed(Shebang Syntax)

// Here we have instantiated a package.json file using npm init -y. Using this, we can define our command initial words, like in this case 
// the commands would run like: (while using the helpObj, organizeObj and treenObj)
// sudo help 
// sudo tree
// sudo organize
// we just need to edit the package.json and enter npm link in the terminal
// and these commands are dynamic, ie. we can run it from cmd too, and then it would automatically catch the current working directory.

let inputArr = process.argv.slice(2);
let fs = require("fs"); //file systems module
let path = require("path");

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let helpObj = require("./commands/help"); //getting objects from the help.js file
let organizeObj = require("./commands/organize"); //getting object from the organize.js file
let treeObj = require("./commands/tree"); //getting object from the tree.js file

let command = inputArr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'msi'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch (command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        // treeFn(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        // organizeFn(inputArr[1]);
        break;
    case "help":
        // helpFn();
        helpObj.helpKey();
        break;
    default:
        console.log("Please Input Right command");
        break;
}



