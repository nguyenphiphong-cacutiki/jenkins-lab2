const fs = require('fs');
const { add } = require('../app.js');

let passed = 0, failed = 0;
function check(name, actual, expected) {
  if (actual === expected) { console.log('✓', name); passed++; }
  else { console.log('✗', name, 'expected', expected, 'got', actual); failed++; }
}

check('add 2+3', add(2, 3), 5);
check('add 0+0', add(0, 0), 0);
check('add -1+1', add(-1, 1), 0);

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/integration.xml', `<?xml version="1.0"?>
<testsuite name="integration" tests="${passed+failed}" failures="${failed}">
  <testcase name="add 2+3"/><testcase name="add 0+0"/><testcase name="add -1+1"/>
</testsuite>`);

if (failed > 0) process.exit(1);