const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let stringMap = data.toString().split("\n");
    
    let mapArrayAux = [];
    stringMap.forEach(coordinateLine => {
        mapArrayAux.push(coordinateLine.split(" "))
    })

    const treeCount = (movRight, movDown) => {
        let mapHeight = mapArrayAux.length //324
        let mapLength = (movRight>movDown) ?
             movRight * mapArrayAux.length // 972
             :
             mapArrayAux.length / movDown
        let coordinateLineLength = mapArrayAux[0][0].length // 31 __ So 972/31 = times to expand map to the right
        let timesToExpandMap = Math.ceil(mapLength/coordinateLineLength); // 32
        console.log('totalMapHeight',mapHeight)
        console.log('totalMapLenght',mapLength)
        console.log('coordinateLineLength',coordinateLineLength)
        console.log('times to expand map module to right', timesToExpandMap)

        let mapArrayAuxExtended = [];
        mapArrayAux.forEach(coordinateLine => {
            mapArrayAuxExtended.push(coordinateLine[0].repeat(timesToExpandMap))
        })
        
        let mapArray = [];
        for(coordinateLineExtended of mapArrayAuxExtended) {
            mapArray.push([coordinateLineExtended.split("")])
        }

        let counter = 0;
        if(movRight>movDown){
            for(let i=1; i<mapArray.length; i++){
                if(mapArray[i][0][i * movRight] === "#"){
                    counter++
                }
            }
            return counter;
        } else {
            for(let i=1; i<mapArray.length/movDown; i++){
                if(mapArray[i * movDown][0][i] === "#"){
                    counter++
                }
            }
            return counter;
        }  
    }
    //Right 3, down 1.
    //console.log(treeCount(3,1))
    
    console.log(treeCount(1,1)*treeCount(3,1)*treeCount(5,1)*treeCount(7,1)*treeCount(1,2))
});