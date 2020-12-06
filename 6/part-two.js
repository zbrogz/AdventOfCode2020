const fs = require('fs');

const hrstart = process.hrtime();

const input = fs.readFileSync('./input.txt', 'utf-8');
const groups = input.split('\n\n');

function getYesCount(group) {
    let yesAnswers = {};
    const people = group.split('\n');
    people.forEach(person => {
        for (let i = 0; i < person.length; i += 1) {
            const question = person[i];
            yesAnswers[question] = yesAnswers[question] + 1 || 1;
        }
    });
    let allYesCount = 0;
    Object.values(yesAnswers).forEach(count => {
        if (count === people.length) {
            allYesCount += 1;
        }
    });
    return allYesCount;
}

let yesCountSum = 0;
groups.forEach(group => {
    yesCountSum += getYesCount(group);
});

console.log('Sum of yes counts:', yesCountSum);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
