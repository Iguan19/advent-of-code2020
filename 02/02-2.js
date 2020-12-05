const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 
    let passwordStringArray = data.toString().split("\n");

    let passwordArray = [];
    passwordStringArray.forEach(stringLine => {
        passwordArray.push(stringLine.split(" "))
    }) 

    let pos1 = 0;
    let pos2 = 0;
    let auxCounter = 0;
    let totalCounter = 0  

    for(passwordLine of passwordArray){
        pos1 = passwordLine[0].split("-")[0];
        pos2 = passwordLine[0].split("-")[1];

        for(let i=0; i<passwordLine[2].length; i++) {
            if(passwordLine[1][0] === passwordLine[2][i]){
                if(i+1 == pos1 || i+1 == pos2) {
                    auxCounter++;
                }
            }
        }

        if(auxCounter == 1){
            totalCounter++;
        }

        auxCounter = 0;
        pos1 = 0;
        pos2 = 0;
    }
    console.log(totalCounter);
})