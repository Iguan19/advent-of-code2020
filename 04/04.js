/*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
*/

const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let linesMap = data.toString().split("\n");
    
    let linesArray = [];
    linesMap.forEach(line => {
        linesArray.push(line.split(" "))
    })

    //Remove blank spaces and grouping passports in an array
    let passportsArray = []
    let auxArray = []
    for(let i=0; i<linesArray.length; i++){
        if(linesArray[i] != '') {
            auxArray = auxArray.concat(linesArray[i])
        } else {
            passportsArray.push(auxArray)
            auxArray = []
        }
    }

    /*
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
    */

    const isPassportValid = (passportsArray) =>{
        let validFieldsCounter = 0;
        let validPassportsCounter = 0;
        for(let j=0; j<passportsArray.length; j++){
            for(let k=0; k<passportsArray[j].length; k++){
                if(passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'byr' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'iyr' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'eyr' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'hgt' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'hcl' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'ecl' ||
                    passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2] === 'pid'){
                        //console.log(passportsArray[j][k][0]+passportsArray[j][k][1]+passportsArray[j][k][2])
                        validFieldsCounter++
                        //console.log(validFieldsCounter)
                }
            }
            if(validFieldsCounter === 7 ){
                validFieldsCounter = 0
                validPassportsCounter++
                //console.log('valid')
            } else {
                validFieldsCounter = 0
                //console.log('invalid')
            }
        }
        return validPassportsCounter
    }
    
    console.log(isPassportValid(passportsArray))
    //console.log(passportsArray.length)
})