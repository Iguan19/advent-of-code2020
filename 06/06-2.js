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

    const DifferentAnswersByAGroup = (groupAnswer) => {
        let answers = []
        for(personAnswer of groupAnswer){
            for(let i=0; i<personAnswer.length;i++) {
                if(/[a-z]/.test(personAnswer[i]) && !answers.includes(personAnswer[i])){
                    answers.push(personAnswer[i])
                } 
            }
        }
        return answers
    }
    //console.log(DifferentAnswersByAGroup([ 'xav', 'uavx', 'xavsi', 'yavx' ]))
    
    const commonAnswersByAGroup = (groupAnswer) => {
        let differentAnswers = DifferentAnswersByAGroup(groupAnswer)
        let commonAnswers = []
        let counter = 0
        let groupSize = groupAnswer.length
        for(answer of differentAnswers){
            for(personAnswer of groupAnswer){
                if(personAnswer.includes(answer)){
                    counter++
                }
            }
            if(groupSize === counter){
                commonAnswers.push(answer)
                counter = 0
            }
            counter = 0
        }
        return commonAnswers
    }
    //console.log(commonAnswersByAGroup([ 'xav', 'uavx', 'xavsi', 'yax' ]))

    
    const CommonYesAnswersOfGroups = (groupsArray) => {
        let counter = 0;
        for(groupAnswers of groupsArray){
            counter = counter + commonAnswersByAGroup(groupAnswers).length
        }
        return counter;
    }
    console.log(CommonYesAnswersOfGroups(groupsArray))
    //console.log(countDifferentYesQuestionsOfGroup(groupsArray))
    //console.log(groupsArray)
})