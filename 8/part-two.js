const fs = require('fs');

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const instructions = input.split('\n');

// returns object with { terminates: boolean, accumulator: number }
function runBootCode(instructions) {
    const ranInstructions = {};
    let i = 0;
    let accumulator = 0;
    while (true) {
        if (i >= instructions.length) {
            return { terminates: true, accumulator };
        }
        if (ranInstructions[i]) {
            return { terminates: false, accumulator };
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
                console.log('invalid instruction');
                break;
        }
    }
}

const oppositeOp = { jmp: 'nop', nop: 'jmp' };

for (let i = instructions.length - 1; i >= 0; i -= 1) {
    const fixedInstructions = [...instructions];
    const [operation, argument] = instructions[i].split(' ');
    if (operation !== 'acc') {
        fixedInstructions[i] = fixedInstructions[i].replace(
            operation,
            oppositeOp[operation]
        );
        const { terminates, accumulator } = runBootCode(fixedInstructions);
        if (terminates) {
            console.log('Accumulator value after termination:', accumulator);
            hrend = process.hrtime(hrstart);
            console.log(
                'Execution time: %ds %dms',
                hrend[0],
                hrend[1] / 1000000
            );
        }
    }
}
