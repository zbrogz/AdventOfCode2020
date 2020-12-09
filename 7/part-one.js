const fs = require('fs');

function bagContainsShinyGold(color) {
    if (bagRules[color]['shiny gold']) {
        return true;
    }

    for (let bagRuleColor of Object.keys(bagRules[color])) {
        if (bagContainsShinyGold(bagRuleColor)) {
            return true;
        }
    }
    return false;
}

const hrstart = process.hrtime();
let containsShinyGoldCount = 0;
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

Object.keys(bagRules).forEach(color => {
    if (bagContainsShinyGold(color)) {
        containsShinyGoldCount += 1;
    }
});

console.log(
    'Number of bag colors that can contain shiny gold:',
    containsShinyGoldCount
);
hrend = process.hrtime(hrstart);
console.log('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000);
