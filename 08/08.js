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

        for(let i=0; i<instructions.length; i++){
            console.log(currentPosition)
            move = executeBootCodeInstruction(instructions[currentPosition])
            currentPosition += move[0]
            if(currentPosition === instructions.length-1){
                return 'reached end of the code'
            }
            if(visitedPositions.includes(currentPosition)){
                console.log(Math.max(...visitedPositions))
                return `position: ${currentPosition} acc: ${acc}`
            }
            visitedPositions.push(currentPosition)
            acc += move[1]
        }
    }
    //console.log(checkBootCode(test))

    const fixSingleCorruptedInstruction = (instructions) => {
        let tweakedInstructions = instructions
        console.log('initial', tweakedInstructions)
        for(let i=0; i<instructions.length; i++) {
            if(instructions[i][0] === 'jmp'){
                tweakedInstructions[i][0] = 'nop'
                console.log(tweakedInstructions)
                tweakedInstructions = [] 
                tweakedInstructions = instructions
            } else if(instructions[i][0] === 'nop'){
                tweakedInstructions[i][0] = 'jmp'
                console.log(tweakedInstructions)
                tweakedInstructions = [] 
                tweakedInstructions = instructions
            }
        }
    }

    fixSingleCorruptedInstruction(test)
})