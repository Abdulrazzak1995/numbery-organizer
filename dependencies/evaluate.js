const assert = require('assert');
const fs = require('fs');

const evaluate = (func, testCases) => {

  // -- log JS Tutor link
  const encoded = encodeURIComponent(func.toString());
  const sanitized = encoded.replace(/\(/g, '%28').replace(/\)/g, '%29');
  const deTabbed = sanitized.replace(/%09/g, '%20%20');
  const url = "http://www.pythontutor.com/live.html#code="
    + deTabbed
    + "&cumulative=false&curInstr=2&heapPrimitives=nevernest&mode=display&origin=opt-live.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false";
  console.log(`\n--- ${func.name} : JS Tutor Link, cmd+click to open ---\n\n${url}\n`);

  // -- evaluate test cases
  const results = [];
  let passing = 0;
  let failing = 0;
  let error = 0;
  for (let test of testCases) {
    console.log('\n-- ' + test.name + ': console output --\n');
    let testResult = '\n';
    try { // catch any errors the function might throw
      const actual = func(...test.args);
      const expected = test.expected;
      try { // catch any failed assertions after function runs
        assert.deepStrictEqual(actual, expected);
        testResult += '+ ' + test.name + ': PASS';
        passing++;
      } catch (assertionError) {
        testResult += '- ' + test.name + ' (FAIL): ' + assertionError.message.toString().split('\n').join('\n  ');
        failing++;
      }
    } catch (runTimeError) {
      testResult += 'x ' + test.name + ' (ERR): ' + runTimeError.stack;
      error++;
    };
    results.push(testResult + '\n');
  }

  // -- build report --
  const fileName = module.parent.filename
    .split(module.parent.path + '/')
    .join('');

  const report = fileName + ' -- '
    + (new Date()).toDateString() + '\n'
    + '\n+ PASS: ' + passing
    + '\n- FAIL: ' + failing
    + '\nx ERROR: ' + error
    + '\n' + results.join('\n');

  // -- log report
  // console.log(report);

  // -- generate report file
  const reportFileName = fileName
    .slice(0, fileName.lastIndexOf('.'))
    + '-report.txt';

  const sanitizedReport = report
    .split('[31m').join('')
    .split('[32m').join('')
    .split('[39m').join('')
    .split(__dirname).join(' [...] ');

  fs.writeFileSync(reportFileName, sanitizedReport);

}

module.exports = evaluate;
