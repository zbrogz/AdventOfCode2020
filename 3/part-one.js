const fs = require('fs');
const readline = require('readline');

const hrstart = process.hrtime();

function slopePointOnLineHasTree(line, y) {
    let x = (3 * (y - 1)) % line.length;
    return line[x] === '#';
}

let treeCount = 0;
let lineCount = 0;

const rl = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
});

rl.on('line', line => {
    lineCount += 1;
    if (slopePointOnLineHasTree(line, lineCount)) {
        treeCount += 1;
    }
});

rl.on('close', () => {
    console.log('Tree count: ', treeCount);
    hrend = process.hrtime(hrstart);
    console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
});
