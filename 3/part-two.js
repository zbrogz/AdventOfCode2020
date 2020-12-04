const fs = require('fs');
const readline = require('readline');

const hrstart = process.hrtime();

const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

function slopePointOnLineHasTree(line, y, slope) {
    let x = (slope.right * ((y - 1) / slope.down)) % line.length;
    const isSlopePointOnLine = (y - 1) % slope.down === 0;
    return line[x] === '#' && isSlopePointOnLine;
}

let lineCount = 0;
const treeCounts = [0, 0, 0, 0, 0];

const rl = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
});

rl.on('line', line => {
    lineCount += 1;
    const y = lineCount;
    slopes.forEach((slope, i) => {
        if (slopePointOnLineHasTree(line, y, slope)) {
            treeCounts[i] += 1;
        }
    });
});

rl.on('close', () => {
    console.log('Tree counts: ', treeCounts);
    let product = 1;
    treeCounts.forEach(treeCount => {
        product = product * treeCount;
    });
    console.log('Product of tree counts: ', product);
    hrend = process.hrtime(hrstart);
    console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
});
