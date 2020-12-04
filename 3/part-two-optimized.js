var fs = require('fs');

function getTreeCount(right, down) {
    let treeCount = 0;

    let x = 0;
    let y = 0;
    while (y < lines.length) {
        if (lines[y][x] === '#') {
            treeCount += 1;
        }
        x = (x + right) % lines[y].length;
        y = y + down;
    }

    return treeCount;
}

const hrstart = process.hrtime();

const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];
const treeCounts = [0, 0, 0, 0, 0];

var input = fs.readFileSync('./input.txt', 'utf-8');
var lines = input.split('\n');

slopes.forEach((slope, i) => {
    treeCounts[i] = getTreeCount(slope.right, slope.down);
});

console.log('Tree counts: ', treeCounts);
let product = 1;
treeCounts.forEach(treeCount => {
    product = product * treeCount;
});
console.log('Product of tree counts: ', product);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
