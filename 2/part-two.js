const fs = require('fs');
const readline = require('readline');

const hrstart = process.hrtime();

function isValidPassword(line) {
    const [rule, letterRule, password] = line.split(' ');
    const [position1, position2] = rule.split('-');
    const letter = letterRule[0];

    return Boolean(
        (password[position1 - 1] === letter) ^
            (password[position2 - 1] === letter)
    );
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
