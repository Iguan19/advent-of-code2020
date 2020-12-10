const fs = require('fs') 

let numbersArray = [];

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 
    
    let numbersStringArray = data.toString().split("\n");
    numbersStringArray.forEach(string => {
        numbersArray.push(Number(string));
    })

    for(let i=0; i<numbersArray.length; i++){
        for(let j=i+1; j<numbersArray.length; j++){
            if(numbersArray[i] + numbersArray[j] === 2020){
                console.log("answer",numbersArray[i] * numbersArray[j]);
                return numbersArray[i] * numbersArray[j]
            }
        }
    }
})

//console.log(numbers);
//const numbersArray = data.toString().split("\n");

//console.log("numbers array",numbersArray);