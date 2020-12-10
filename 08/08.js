const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let bagTypesMap = data.toString().split("\n");
    //Array of string
    //console.log(bagTypesArray)

    let bagTypesArray = [];
    bagTypesMap.forEach(line => {
        bagTypesArray.push(line)
    })
    //Array of string
    //console.log(bagTypesArray)

})