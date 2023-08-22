let fs = require("fs"); //file systems module
let path = require("path");
function treeFn(dirPath)
{ 
    if(dirPath == undefined)
    {
        // console.log("Kindly enter the path");
        treeHelper(process.cwd(), "");
        return;
    }
    else{
        let ifExists = fs.existsSync(dirPath);
        if(ifExists == true)
        {
            treeHelper(dirPath,"");
        }
        else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(dirPath, indent)
{
    //is file or a folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true)
    {
        let filename = path.basename(dirPath);
        console.log(indent+"├──" + filename);
    }
    else{
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++)
        {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}