const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
let seats = input.split('\n').map(r => r.split(''));

const SEAT = {
    EMPTY: 'L',
    OCCUPIED: '#',
    FLOOR: '.',
};

function countOccupiedAdjacentSeats(row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i += 1) {
        for (let j = column - 1; j <= column + 1; j += 1) {
            if (i === row && j === column) {
                continue;
            }

            if (seats[i]?.[j] === SEAT.OCCUPIED) {
                count += 1;
                // TODO; optimize once 4+
            }
        }
    }
    return count;
}

function runSeatRules() {
    let nextSeats = [];
    let stateChange = false;
    for (let i = 0; i < seats.length; i += 1) {
        const row = seats[i];
        nextSeats[i] = [];
        for (let j = 0; j < row.length; j += 1) {
            const seat = row[j];
            nextSeats[i][j] = seat;
            if (seat === SEAT.EMPTY && !countOccupiedAdjacentSeats(i, j)) {
                nextSeats[i][j] = SEAT.OCCUPIED;
                stateChange = true;
            } else if (
                seat === SEAT.OCCUPIED &&
                countOccupiedAdjacentSeats(i, j) >= 4
            ) {
                nextSeats[i][j] = SEAT.EMPTY;
                stateChange = true;
            }
        }
    }

    seats = nextSeats;
    return stateChange;
}

while (runSeatRules()) {}

let occupiedCount = 0;
for (let i = 0; i < seats.length; i += 1) {
    const row = seats[i];
    for (let j = 0; j < row.length; j += 1) {
        const seat = row?.[j];
        if (seat === SEAT.OCCUPIED) {
            occupiedCount += 1;
        }
    }
}

console.log('Occupied seats:', occupiedCount);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
