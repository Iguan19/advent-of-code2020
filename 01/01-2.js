/**
Specifically, they need you to find the two entries that sum to 2020 and then 
multiply those two numbers together.
For example, suppose your expense report contained the following:
1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. 
Multiplying them together produces 1721 * 299 = 514579, 
so the correct answer is 514579.
 */
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
            for(let k=j+1; k<numbersArray.length; k++){
                if(numbersArray[i] + numbersArray[j] + numbersArray[k] === 2020){
                    console.log("answer",numbersArray[i] * numbersArray[j] * numbersArray[k]);
                    return numbersArray[i] * numbersArray[j] * numbersArray[k]
                } 
            }
        }
    }
})





//console.log(numbers);
//const numbersArray = data.toString().split("\n");

//console.log("numbers array",numbersArray);