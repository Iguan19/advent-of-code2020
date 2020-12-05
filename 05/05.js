const fs = require('fs'); 

fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 

    let seatsArray = data.toString().split("\n");
    
   /*  The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

    For example, consider just the first seven characters of FBFBBFFRLR:

    Start by considering the whole range, rows 0 through 127.
    F means to take the lower half, keeping rows 0 through 63.
    B means to take the upper half, keeping rows 32 through 63.
    F means to take the lower half, keeping rows 32 through 47.
    B means to take the upper half, keeping rows 40 through 47.
    B keeps rows 44 through 47.
    F keeps rows 44 through 45.
    The final F keeps the lower of the two, row 44.
    */

    const whichRow = (seat) => {
        let rowRange = [0,127]
        let aux = 0;
        for(let i=0; i<6; i++){
            if(seat[i] === "F"){
                aux = Math.round((rowRange[1]-rowRange[0])/2)
                rowRange[1] = rowRange[1] - aux
            } else {
                aux = Math.round((rowRange[1]-rowRange[0])/2)
                rowRange[0] = rowRange[0] + aux
            }
        }
        if(seat[6] === "F"){
            return rowRange[0]
        } else {
            return rowRange[1]
        }
    }

    /* The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

    For example, consider just the last 3 characters of FBFBBFFRLR:

    Start by considering the whole range, columns 0 through 7.
    R means to take the upper half, keeping columns 4 through 7.
    L means to take the lower half, keeping columns 4 through 5.
    The final R keeps the upper of the two, column 5.
    */

    const whichColumn = (seat) => {
        let columnRange = [0,7]
        let aux = 0;

        for(let i=7; i<10; i++){
            if(seat[i] === "L"){
                aux = Math.round((columnRange[1]-columnRange[0])/2)
                columnRange[1] = columnRange[1] - aux
            } else {
                aux = Math.round((columnRange[1]-columnRange[0])/2)
                columnRange[0] = columnRange[0] + aux
            }
        }
        if(seat[9] === "L"){
            return columnRange[0]
        } else {
            return columnRange[1]
        }

    }
    /* 
    Every seat also has a unique seat ID: multiply the row by 8, then add the column. 
    In this example, the seat has ID 44 * 8 + 5 = 357.
     */
    const seatId = (seat) => {
        return whichRow(seat) * 8 + whichColumn(seat)
    }

    const maxSeatId = (seatsArray) => {
        let higherSetId = 0
        for(seat of seatsArray){
            if(seatId(seat) > higherSetId){
                higherSetId = seatId(seat)
            }
        }
        return higherSetId
    }

    //console.log(seatsArray)
    //console.log(whichRow('FBFBBFFRLR'))
    //console.log(whichColumn('FBFBBFFRLR'))
    //console.log(seatId('FBFBBFFRLR'))
    console.log(maxSeatId(seatsArray))
})