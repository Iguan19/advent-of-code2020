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

    
   //byr (Birth Year) - four digits; at least 1920 and at most 2002.
    const isBirthValid = (number) => {
        if(number >=  1920 && number <=  2002){
            return true
        } else {
            return false
        }
    }
    //iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    const isYearValid= (number) => {
        if(number >=  2010 && number <=  2020){
            return true
        } else {
            return false
        }
    }
    //eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    const isExpValid= (number) => {
        if(number >=  2020 && number <=  2030){
            return true
        } else {
            return false
        }
    }
    /*
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    */
    const isHeightValid= (string) => {
        let height = 0;
        if(string[3] === 'c'){
            height = string.split("c")[0];
            if(height >= 150 && height <= 193){
                return true;
            } 
        } else if (string[2] === 'i'){
            height = string.split("i")[0];
            if(height >= 59 && height <= 76){
                return true
            }
        }
        return false
    }
    ;
    //hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    const isHairColorValid = (string) => {
        if(string[0] === '#' && string.length === 7){
            for(let i=1;i<string.length;i++){
                if(/[a-f]|[0-9]/g.test(string[i]) === false){
                    return false
                }
            }
            return true
        }
        return false
    }
    //console.log(isHairColorValid('#12345f'))
    //ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const isEyeColorValid = (string) => {
        if(/(amb|blu|brn|gry|grn|hzl|oth)/g.test(string)){
            return true
        }
        return false
    }
    //console.log(isEyeColorValid('gry'))
    //pid (Passport ID) - a nine-digit number, including leading zeroes.
    const isPidValid = (string) => {
        if(string.length === 9){
            for(number of string){
                if(/[0-9]/g.test(number) === false){
                    return false
                }
            }
            return true
        }
        return false
    }
    //console.log(isPidValid('123456799'))

    //Part 1 Function
    const areRequiredFieldsPresent = (passportArray) => {
        let validFieldsCounter = 0;
        let validPassport = false;
        for(field of passportArray){
            if(/(byr|iyr|eyr|hgt|hcl|ecl|pid)/g.test(field[0]+field[1]+field[2])){
                validFieldsCounter++
            }
        }
        if(validFieldsCounter === 7 ){
            validFieldsCounter = 0
            validPassport = true
            //console.log('valid')
        } else {
            validFieldsCounter = 0
            //console.log('invalid')
        }
        return validPassport;
    }

    const areRequiredFieldsValid = (passportArray) => {
        let validFieldsCounter = 0;
        let validPassport = false;
        //we only check the passports that contain the required fields
        if(areRequiredFieldsPresent(passportArray)){
            for(field of passportArray){
                switch(field[0]+field[1]+field[2]) {
                    case 'byr':
                        if(isBirthValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'iyr': 
                        if(isYearValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'eyr':
                        if(isExpValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'hgt':
                        if(isHeightValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'hcl':
                        if(isHairColorValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'ecl':
                        if(isEyeColorValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;
                    case 'pid':
                        if(isPidValid(field.split(":")[1])){
                            validFieldsCounter++
                        }
                        break;  
                    default:
                        break;
                }
            }
            if(validFieldsCounter === 7 ){
                validFieldsCounter = 0
                validPassport = true
                //console.log('valid')
            } else {
                validFieldsCounter = 0
                //console.log('invalid')
            }

        }
        return validPassport;
    }

    const isPassportValid = (passportsArray) => {
        let validPassportCounter = 0;
        for(passport of passportsArray){
            if(areRequiredFieldsPresent(passport) && areRequiredFieldsValid(passport)){
                validPassportCounter++
            }
        }
        return validPassportCounter;
    }
    
    //console.log(passportsArray[0])
    //console.log(areRequiredFieldsPresent(passportsArray[0]))
    //console.log(areRequiredFieldsValid(passportsArray[0]))
    console.log("Valid Passports:",isPassportValid(passportsArray))
})