const fs = require('fs');

const expenseReport = fs.readFileSync('./expense-report.txt', 'utf-8');

const entries = expenseReport.split(/(\s+)/).map(v => parseInt(v));

for (let i = 0; i < entries.length - 2; i += 1) {
    for (let j = i + 1; j < entries.length - 1; j += 1) {
        const sum = entries[i] + entries[j];
        if (sum === 2020) {
            const product = entries[i] * entries[j];
            console.log(entries[i], entries[j]);
            console.log("Answer found: ", product);
            return;
        }
    }
}
