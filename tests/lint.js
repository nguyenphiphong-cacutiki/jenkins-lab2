const fs = require('fs');

let passed = 0, failed = 0;
const failures = [];

function check(name, ok) {
  if (ok) { console.log('✓', name); passed++; }
  else { console.log('✗', name); failed++; failures.push(name); }
}

const src = fs.readFileSync('app.js', 'utf8');
check('app.js contains no TODO', !src.includes('TODO'));

fs.mkdirSync('reports', { recursive: true });
const failureXml = failures.map(name =>
  `  <testcase name="${name}"><failure message="lint check failed"/></testcase>`
).join('\n');
const passXml = Array.from({ length: passed }, (_, i) => `  <testcase name="lint-pass-${i + 1}"/>`).join('\n');
fs.writeFileSync('reports/lint.xml', `<?xml version="1.0"?>
<testsuite name="lint" tests="${passed + failed}" failures="${failed}">
${passXml}${failureXml ? '\n' + failureXml : ''}
</testsuite>
`);

if (failed > 0) process.exit(1);
