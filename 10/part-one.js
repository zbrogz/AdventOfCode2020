const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const adapters = input
    .split('\n')
    .map(v => parseInt(v))
    .sort((a, b) => a - b);

const joltageDifferences = {
    1: 0,
    2: 0,
    3: 1,
};

let currentJoltage = 0;
adapters.forEach(adapter => {
    const difference = adapter - currentJoltage;
    joltageDifferences[difference] += 1;
    currentJoltage = adapter;
});

const answer = joltageDifferences[1] * joltageDifferences[3];
console.log('Joltage differences multiplied:', answer);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
