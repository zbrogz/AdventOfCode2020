const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const adapters = input
    .split('\n')
    .map(v => parseInt(v))
    .sort((a, b) => a - b);
adapters.unshift(0);
const routes = {};

function getAdapterRoutes(index) {
    let count = 0;
    for (let i = index + 1; i < adapters.length && i <= index + 3; i += 1) {
        if (adapters[i] - adapters[index] <= 3) {
            if (routes[i] === undefined) {
                routes[i] = getAdapterRoutes(i);
            }
            count += routes[i];
        }
    }
    return count || 1;
}

console.log('Adapter combinations:', getAdapterRoutes(0));
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
