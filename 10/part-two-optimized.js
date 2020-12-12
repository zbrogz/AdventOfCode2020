const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const adapters = input
    .split('\n')
    .map(v => parseInt(v))
    .sort((a, b) => a - b);
adapters.push(adapters[adapters.length - 1] + 3);
const routeCounts = { 0: 1 };

function getRouteCounts(adapter) {
    return (
        (routeCounts[adapter - 1] || 0) +
        (routeCounts[adapter - 2] || 0) +
        (routeCounts[adapter - 3] || 0)
    );
}

adapters.forEach(adapter => {
    routeCounts[adapter] = getRouteCounts(adapter);
});

console.log(
    'Adapter combinations:',
    routeCounts[adapters[adapters.length - 1]]
);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000); // interestingly the actual execution time is about the same as the recursive solution
