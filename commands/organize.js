function organizeFn(dirPath)
{
    //Steps to work for organizeDirectory function
    // 1. take input for the directory path where files need to be organized

    let destPath;
    if(dirPath == undefined)
    {
        // console.log("Kindly enter the path");
        destPath = process.cwd();
        return;
    }
    else{
        let ifExists = fs.existsSync(dirPath);
        if(ifExists == true)
        {
            // 2. create a new directory named "Organized files" to keep those files in organized manner
            let destPath = path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath)==false) // if there is no directory being formed before, then only create a new one
            {
                fs.mkdirSync(destPath);
            }
            
            // 3. We need to identify the categories of all the files present in the given input directory.
            organizeHelper(dirPath, destPath);
        }
        else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
    
}

function organizeHelper(src, dest)
{
    let childnames = fs.readdirSync(src);//gives all the files and folders present in the src directory
    for(let i=0; i<childnames.length; i++)
    {
        let childAddress = path.join(src, childnames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile == true) //if the particular childAdress is found to be a file
        {
            // console.log(childnames[i]);
            let category = getCategory(childnames[i]);
            console.log(childnames[i], "belongs to", category);
            
            // 4. We need to copy the files to the new organized directory inside the relevant category folders.
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category)
{
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }
    let filename = path.basename(srcFilePath); //get only the file name(last in the path like "abc.txt")
    let destFilePath = path.join(categoryPath, filename); // complete dest path for the srcFile name 
    fs.copyFileSync(srcFilePath, destFilePath); //copy the content from the srcFilePathb to destFilePath
    //fs.unlinkSync(srcFilePath); //to remove the file from original path
    console.log(filename,"copied to", category);
}

function getCategory(name)
{
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types)
    {
        let cTypeArray = types[type];
        for(let i=0; i<cTypeArray.length; i++)
        {
            if(ext == cTypeArray[i])
            {
                return type;
            }
        } 
    }
}

module.exports = {
    organizeKey: organizeFn
}