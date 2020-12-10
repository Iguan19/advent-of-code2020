/* --- Part Two ---

It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

    faded blue bags contain 0 other bags.
    dotted black bags contain 0 other bags.
    vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
    dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.

So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.

In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
*/

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
    ]  */

    //Returns container bag color 
    const getBagColor = (bag) => {
        let bagArray = bag.split("contain")
        let bagColor = bagArray[0].split('bags')[0].trim()
        return bagColor
    }

    //Searchs for a color of bag in the bags array
    const retrieveBagInfoFromColor = (bagColor) => {
        for(bag of bagTypesArray){
            if(getBagColor(bag) === bagColor){
                return bag
            }
        }
    }

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

    //Input a bag color and it returns number of bags that can be contained inside
    const part2 = (bagColor) => {
        let bag = retrieveBagInfoFromColor(bagColor)
        let numberOfBags = 0

        const recursiveCountBagsCanContain = (bag) => {
            let bagContent = getBagCanContain(bag)
            numberOfBags = bagContent.reduce((acc, el) => {
                return acc + Number(el[0])
            }, 0)

            for(bagType of bagContent) {       
                if(/no other/.test(bag)){
                    continue
                } else {
                    numberOfBags = numberOfBags + bagType[0] * recursiveCountBagsCanContain(retrieveBagInfoFromColor(bagType[1]))
                }    
            }
            return numberOfBags
        }
        
        return recursiveCountBagsCanContain(bag)
    }
    console.log(part2('shiny gold'))
})