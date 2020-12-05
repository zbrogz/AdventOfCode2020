const fs = require('fs');

const hrstart = process.hrtime();

const input = fs.readFileSync('./input.txt', 'utf-8');
const passports = input.split('\n\n');
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']; //'cid'];

function isValidPassport(passport) {
    const presentFields = {};
    const fields = passport.split(/(\s+)/);
    
    fields.forEach(field => {
        presentFields[field.split(':')[0]] = true;
    });

    for (const requiredField of requiredFields) {
        if (!presentFields[requiredField]) {
            return false;            
        }
    }
    return true
}

let validPassportCount = 0;

passports.forEach(passport => {
    if (isValidPassport(passport)) {
        validPassportCount = validPassportCount + 1;
    }
})

console.log("Valid passport count:", validPassportCount);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
