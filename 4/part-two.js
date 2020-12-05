const fs = require('fs');

const hrstart = process.hrtime();

const input = fs.readFileSync('./input.txt', 'utf-8');
const passports = input.split('\n\n');
const requiredFields = {
    byr: val => val.length === 4 && val && val >= 1920 && val <= 2002,
    iyr: val => val.length === 4 && val && val >= 2010 && val <= 2020,
    eyr: val => val.length === 4 && val && val >= 2020 && val <= 2030,
    hgt: val => {
        if (val.length < 4) return false;
        const unit = val.slice(-2);
        const height = val.slice(0, -2);
        return (
            (unit === 'cm' && height >= 150 && height <= 193) ||
            (unit === 'in' && height >= 59 && height <= 76)
        );
    },
    hcl: val => val.match(/^#[0-9a-f]{6}$/),
    ecl: val =>
        ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(val) !== -1,
    pid: val => val.match(/^\d{9}$/) && val.length === 9,
};

function isValidPassport(passport) {
    const presentFields = {};
    const fields = passport.split(/(\s+)/);

    fields.forEach(field => {
        const [rule, value] = field.split(':');
        presentFields[rule] = value;
    });

    for (const [requiredFieldRule, validator] of Object.entries(
        requiredFields
    )) {
        if (
            !presentFields[requiredFieldRule] ||
            !validator(presentFields[requiredFieldRule])
        ) {
            return false;
        }
    }
    return true;
}

let validPassportCount = 0;

passports.forEach(passport => {
    if (isValidPassport(passport)) {
        validPassportCount = validPassportCount + 1;
    }
});

console.log('Valid passport count:', validPassportCount);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
