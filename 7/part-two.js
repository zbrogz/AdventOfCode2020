const fs = require('fs');

function countBagsInside(color) {
    let count = 0;

    for (let [bagRuleColor, bagRuleCount] of Object.entries(bagRules[color])) {
        count = count + (countBagsInside(bagRuleColor) + 1) * bagRuleCount;
    }
    return count;
}

const hrstart = process.hrtime();
const input = fs.readFileSync('./input.txt', 'utf-8');
const bagRuleStrings = input.split('\n');
// const bagRules = {
//     'light red': {
//         'bright white': 1,
//         'muted yellow': 2,
//     },
//     'dark orange': {
//         'bright-white': 3,
//         'muted yellow': 4,
//     },
//     'faded blue': {},
//     ...
// };

const bagRules = {};
bagRuleStrings.forEach(bagRuleString => {
    const bagRule = {};
    const [color, containString] = bagRuleString
        .replace('.', '')
        .split(' bags contain ');
    if (containString !== 'no other bags') {
        const containRules = containString.split(', ');
        containRules.forEach(containRule => {
            const number = containRule[0];
            const crColor = containRule.slice(2).replace(/ bags?$/, '');
            bagRule[crColor] = number;
        });
    }
    bagRules[color] = bagRule;
});

const bagCountInsideShinyGold = countBagsInside('shiny gold');

console.log('Number of bags inside shiny gold:', bagCountInsideShinyGold);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
