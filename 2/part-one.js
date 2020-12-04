const fs = require('fs');
const readline = require('readline');

const hrstart = process.hrtime();

function isValidPassword(line) {
    const [rule, letterRule, password] = line.split(' ');
    const [min, max] = rule.split('-');
    const letter = letterRule[0];
    let letterCount = 0;
    for (let i = 0; i < password.length; i += 1) {
        if (password[i] === letter) {
            letterCount += 1;
        }
    }
    return letterCount <= max && letterCount >= min;
}

let validPasswordCount = 0;

const rl = readline.createInterface({
    input: fs.createReadStream('./passwords.txt'),
    crlfDelay: Infinity,
});

rl.on('line', line => {
    if (isValidPassword(line)) {
        validPasswordCount += 1;
    }
});

rl.on('close', () => {
    console.log('Valid password count: ', validPasswordCount);
    hrend = process.hrtime(hrstart);
    console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
});
