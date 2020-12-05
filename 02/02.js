const fs = require('fs'); 

let passwordArray = []
let auxCounter = 0;
let totalCounter = 0
let min = 0
let max = 0

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 
    
    let passwordStringArray = data.toString().split("\n");

    passwordStringArray.forEach(stringLine => {
        passwordArray.push(stringLine.split(" "))
    }) 

    for(passwordLine of passwordArray){
        min = passwordLine[0].split("-")[0]
        max = passwordLine[0].split("-")[1]
        for(let i=0; i<passwordLine[2].length; i++){
            if(passwordLine[1][0] === passwordLine[2][i]){
                auxCounter++
            }
        }
        if(auxCounter >= min && auxCounter <= max){
            totalCounter++
        } 
        auxCounter = 0
        min = 0
        max = 0
    }
    console.log(totalCounter)
})