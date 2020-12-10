const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let bagTypesMap = data.toString().split("\n");
    //Array of string
    //console.log(bagTypesArray)

    let bagTypesArray = [];
    bagTypesMap.forEach(line => {
        bagTypesArray.push(line)
    })
    //Array of string
    //console.log(bagTypesArray)

    //let randomBagType = 'light red bags contain 1 bright white bag, 2 muted yellow bags.'

    /* let testingRules = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.'
    ] */

    //Returns container bag color 
    const getBagColor = (bag) => {
        let bagArray = bag.split("contain")
        let bagColor = bagArray[0].split('bags')[0].trim()
        return bagColor
    }
    //console.log(getBagColor(randomBagType))

    //Searchs for a color of bag in the bags array
    const retrieveBagInfoFromColor = (bagColor) => {
        for(bag of bagTypesMap){
            if(getBagColor(bag) === bagColor){
                return bag;
            }
        }
    }
    //console.log(retrieveBagInfoFromColor(getBagColor(randomBagType)))

    //Returns what a specific bag can contain in this form [[qty],[bagColor]] --> [ [3], ['shiny gold'] ]
    // [ ['n'], ['no other']] for no containers
    const getBagCanContain = (bag) => {
        let bagArray = bag.split("contain")
        let bagCanContain = bagArray[1].split(",")
        let bagContent = []
        for(content of bagCanContain){
            let quantity = content[1]
            let aux = content
            if(/no other/.test(content)){
                bagContent.push([0,'no other'])
            } else {
                let contentName = aux.slice(2, aux.search(/bag/)).trim()
                bagContent.push([quantity,contentName])
            }
        }
        return bagContent
    }
    //console.log(getBagCanContain(randomBagType))

    const part1 = (bagsArray) => {
        let counter = 0
        let found = false

        //Returns true if a bag or sub-bag of it can contains shiny gold bags
        const recursiveCanContainShinyGold = (bag) => {
            if(/shiny gold/.test(getBagCanContain(bag))){
                found = true
            } else if(!found){
                bagCanContain = getBagCanContain(bag)
                for(type of bagCanContain){
                    if(/no other/.test(type)){
                        continue
                    } else {
                        recursiveCanContainShinyGold(retrieveBagInfoFromColor(type[1]))
                    }
                }
            }
            if(found){
                return true
            } else {
                return false
            }
        }

        for(bag of bagsArray){
            if(recursiveCanContainShinyGold(bag)){
                found = false
                counter++
            }
        }
        console.log(counter)
    }
    console.log(part1(bagTypesArray)) 
})