const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let linesMap = data.toString().split("\n");
    //Array of strings
    //console.log(linesMap)

    let linesArray = [];
    linesMap.forEach(line => {
        linesArray.push(line.split(" "))
    })
    //Array of arrays
    //console.log(linesArray);

    //Remove blank spaces and groups different groups of ppl in an array
    let groupsArray = []
    let auxArray = []
    for(let i=0; i<linesArray.length; i++){
        if(linesArray[i] != '') {
            auxArray = auxArray.concat(linesArray[i])
        } else {
            groupsArray.push(auxArray)
            auxArray = []
        }
    }

    /*  First 3 groupsArray
    [ 'xav', 'uavx', 'xavsi', 'yavx' ],
    [ 'efokjptizdcwmqnuh', 'qgfdvurtnjwpichxk', 'taqkcunfzpmydiwjsh' ], 
    [ 'mzbg', 'tmg', 'rlvge', 'hgpbzn', 'cagkijyu' ],
    */

    const countDifferentYesQuestionsOfGroup = (groupsArray) => {
        let counter = 0;
        let alreadyCounted = []
        for(groupAnswers of groupsArray){
            for(personAnswer of groupAnswers){
                for(let i=0; i<personAnswer.length;i++){
                    if(/[a-z]/.test(personAnswer[i]) && !alreadyCounted.includes(personAnswer[i])){
                        counter++
                        alreadyCounted.push(personAnswer[i])
                    }
                }
            }
            //reset after group check
            alreadyCounted = [];
        }
        return counter;
    }
    console.log(countDifferentYesQuestionsOfGroup(groupsArray))
    //console.log(groupsArray)
})