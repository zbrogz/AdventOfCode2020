const fs = require('fs');

const hrstart = process.hrtime();

const input = fs.readFileSync('./input.txt', 'utf-8');
const boardingPasses = input.split('\n');

function getSeatId(boardingPass) {
    const rowString = boardingPass
        .slice(0, -3)
        .replace(/F/g, '0')
        .replace(/B/g, '1');
    const row = parseInt(rowString, 2);
    const columnString = boardingPass
        .slice(-3)
        .replace(/L/g, '0')
        .replace(/R/g, '1');
    const column = parseInt(columnString, 2);
    return row * 8 + column;
}

let maxSeatId = 0;
const seatIds = {};
boardingPasses.forEach(boardingPass => {
    const id = getSeatId(boardingPass);
    seatIds[id] = true;
    if (id > maxSeatId) {
        maxSeatId = id;
    }
});

let missingSeatId;
for (let i = maxSeatId - 1; i >= 0; i -= 1) {
    if (!seatIds[i]) {
        missingSeatId = i;
        break;
    }
}

console.log('Missing seat ID:', missingSeatId);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
