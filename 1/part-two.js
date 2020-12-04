const fs = require('fs');

const hrstart = process.hrtime();

const expenseReport = fs.readFileSync('./expense-report.txt', 'utf-8');

const entries = expenseReport.split(/(\s+)/).map(v => parseInt(v));

for (let i = 0; i < entries.length - 2; i += 1) {
    for (let j = i + 1; j < entries.length - 1; j += 1) {
        for (let k = j + 1; k < entries.length; k += 1) {
            const sum = entries[i] + entries[j] + entries[k];
            if (sum === 2020) {
                const product = entries[i] * entries[j] * entries[k];
                console.log(entries[i], entries[j], entries[k]);
                console.log('Answer found: ', product);
                hrend = process.hrtime(hrstart);
                console.log(
                    'Execution time: %ds %dms',
                    hrend[0],
                    hrend[1] / 1000000
                );
                return;
            }
        }
    }
}
