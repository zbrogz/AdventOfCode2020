const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const numbers = input.split('\n').map(v => parseInt(v));

const sums = {};

// const sums = {
//     0: Set { 22, 35, 15 },
//     1: Set( 345, 44, 56 },
//     ...
// }

function computePreambleSums() {
    for (let i = 0; i < 24; i += 1) {
        sums[i] = new Set();
        for (let j = i + 1; j < 25; j += 1) {
            if (numbers[i] !== numbers[j]) {
                sums[i].add(numbers[i] + numbers[j]);
            }
        }
    }
}

function breaksSumProperty(number, index) {
    for (let i = index - 25; i < index - 1; i += 1) {
        if (sums[i].has(number)) {
            return false;
        }
    }
    return true;
}

function findFirstPropertyBreaker() {
    computePreambleSums();

    for (let i = 25; i < numbers.length; i += 1) {
        if (breaksSumProperty(numbers[i], i)) {
            return numbers[i];
        }

        // Add number to sums
        sums[i - 1] = new Set();
        for (let j = i - 24; j < i; j += 1) {
            if (numbers[i] !== numbers[j]) {
                sums[i - 1].add(numbers[i] + numbers[j]);
            }
        }
    }
}

const firstPropertyBreaker = findFirstPropertyBreaker();

for (let i = 0; i < numbers.length - 1; i += 1) {
    let sum = numbers[i];
    let max = numbers[i];
    let min = numbers[i];
    for (let j = i + 1; j < numbers.length; j += 1) {
        sum = sum + numbers[j];
        max = Math.max(max, numbers[j]);
        min = Math.min(min, numbers[j]);
        if (sum === firstPropertyBreaker) {
            const encyrptionWeakness = min + max;
            console.log(
                'Encryption weakness:',
                encyrptionWeakness
            );
            hrend = process.hrtime(hrstart);
            console.log(
                'Execution time: %ds %dms',
                hrend[0],
                hrend[1] / 1000000
            );
        }
    }
}
