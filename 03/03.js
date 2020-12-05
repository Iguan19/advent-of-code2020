const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let stringMap = data.toString().split("\n");
    
    let mapArrayAux = [];
    stringMap.forEach(coordinateLine => {
        mapArrayAux.push(coordinateLine.split(" "))
    })
    console.log('firstLineModularMap', mapArrayAux[0])

    let mapHeight = mapArrayAux.length //324
    let mapLength = 3 * mapArrayAux.length // 972
    let coordinateLineLength = mapArrayAux[0][0].length // 31 So 972/31 = times to expand map to the right
    let timesToExpandMap = Math.ceil(mapLength/coordinateLineLength); // 32
    console.log('totalMapHeight',mapHeight)
    console.log('totalMapLenght',mapLength)
    console.log('coordinateLineLength',coordinateLineLength)
    console.log('times to expand map module to right', Math.ceil(972/31))
    

    let mapArrayAuxExtended = [];
    mapArrayAux.forEach(coordinateLine => {
        mapArrayAuxExtended.push(coordinateLine[0].repeat(timesToExpandMap))
    })
    //console.log('firstLineExtendedMap', mapArrayAuxExtended[0])
    
    let mapArray = [];
    for(coordinateLineExtended of mapArrayAuxExtended) {
        mapArray.push([coordinateLineExtended.split("")])
    }

    let counter = 0;
    for(let i=1; i<mapArray.length; i++){
        if(mapArray[i][0][i * 3] === "#"){
            counter++
        }
    }
    console.log("Total Trees encountered",counter)
});

