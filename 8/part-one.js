const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const instructions = input.split('\n');
const ranInstructions = {};
let i = 0;
let accumulator = 0;
while (true) {
    if (ranInstructions[i]) {
        break;
    }
    ranInstructions[i] = true;
    const [operation, argument] = instructions[i].split(' ');

    switch (operation) {
        case 'acc':
            accumulator += parseInt(argument);
            i += 1;
            break;
        case 'jmp':
            i += parseInt(argument);
            break;
        case 'nop':
            i += 1;
            break;
        default:
            console.log("invalid instruction")
            break;
    }
}

console.log('Accumulator value before second loop:', accumulator);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
