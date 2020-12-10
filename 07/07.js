/* --- Day 7: Handy Haversacks ---

You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.

These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

    A bright white bag, which can hold your shiny gold bag directly.
    A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
    A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
    A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.

So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
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