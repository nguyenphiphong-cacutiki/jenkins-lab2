const { add, greet } = require('./app.js');
const assert = require('assert');

assert.strictEqual(add(2, 3), 5, 'add(2,3) should be 5');
assert.strictEqual(greet('World'), 'Hello, World!', 'greet should work');
assert.strictEqual(add(2, 3), 999, 'intentional fail');
console.log('All tests passed.');
