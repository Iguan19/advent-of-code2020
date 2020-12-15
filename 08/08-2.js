const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let instructionsMap = data.toString().split("\n");
    //Array of string
    //console.log(bagTypesArray)

    let instructionsArray = [];
    instructionsMap.forEach(line => {
        instructionsArray.push(line.split(" "))
    })
    //Array of string
    //console.log(bagTypesArray)

    //Example
    /* [ [ 'acc', '+13' ],
    [ 'jmp', '+412' ],
    [ 'nop', '+137' ],
    [ 'nop', '+144' ],
    [ 'acc', '+33' ],
    [ 'acc', '-11' ] ] */

    const test = [['nop', +0],
    ['acc', +1],
    ['jmp', +4],
    ['acc', +3],
    ['jmp', -3],
    ['acc', -99],
    ['acc', +1],
    ['jmp', -4],
    ['acc', +6]]

    const executeBootCodeInstruction = (instruction) => {
        let acc = 0
        let position = 0
        if(instruction[0] === 'acc'){
            acc = acc + Number(instruction[1])
            position = 1
        } else if(instruction[0] === 'jmp') {
            position += Number(instruction[1]) 
            acc = 0
        } else if(instruction[0] === 'nop') {
            position = 1
            acc = 0
        }
        return [position, acc]
    }

    const checkBootCode = (instructions) => {
        let visitedPositions = [0]
        let currentPosition = 0
        let move = []
        let acc = 0
        let previousPosition = 0

        for(let i=0; i<instructions.length; i++){
            previousPosition = currentPosition
            move = executeBootCodeInstruction(instructions[currentPosition])
            currentPosition += move[0]
            if(visitedPositions.includes(currentPosition)){
                console.log(previousPosition)
                let previousInstruction = instructions[previousPosition]
                console.log(previousInstruction)
                //return `position: ${currentPosition} acc: ${acc}`
                /* if(instructions[previousPosition][0] === 'jump'){

                } else if(instructions[previousPosition][0] === 'jump'){

                } */
                return
            }
            visitedPositions.push(currentPosition)
            acc += move[1]
        }
        
    }
    console.log(checkBootCode(instructionsArray))
})