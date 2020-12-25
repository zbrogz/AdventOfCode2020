const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
let seats = input.split('\n').map(r => r.split(''));

const SEAT = {
    EMPTY: 'L',
    OCCUPIED: '#',
    FLOOR: '.',
};

function countFirstOccupiedVisibleSeats(row, column) {
    let count = 0;
    for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
            if (i === 0 && j === 0) {
                continue;
            }

            let x = row + i;
            let y = column + j;
            while (x >= 0 && x < seats.length && y >= 0 && y < seats[row].length) {
                if (seats[x][y] === SEAT.OCCUPIED) {
                    count += 1;
                    break;
                } else if (seats[x][y] === SEAT.EMPTY) {
                    break;
                }
                x += i;
                y += j;
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
            if (seat === SEAT.EMPTY && !countFirstOccupiedVisibleSeats(i, j)) {
                nextSeats[i][j] = SEAT.OCCUPIED;
                stateChange = true;
            } else if (
                seat === SEAT.OCCUPIED &&
                countFirstOccupiedVisibleSeats(i, j) >= 5
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
