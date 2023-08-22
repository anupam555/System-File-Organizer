function helpFn()
{
    //Here to write in multiple lines, we have used backtick(`)
    console.log(`List of all the commands:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help
    `)
}

//this is done to export the helpFn object to be used from outside the file
module.exports= {
    helpKey : helpFn
}