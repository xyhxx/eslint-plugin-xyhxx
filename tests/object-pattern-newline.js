const {RuleTester} = require('eslint');
const {rules} = require('../lib');
const {it} = require('vitest');

const tester = new RuleTester({env: {es6: true}});

it('object-pattern-newline', function() {
  tester.run(
    'object-pattern-newline',
    rules['object-pattern-newline'],
    {
      valid: [{name: 'one line', code: 'const obj = {a: 1, b: 2, c: 3}; const {a,b,c} = obj;'}],
      invalid: [
        {
          name: 'multiple line',
          code: `const obj = {a: 1, b: 2, c: 3}; 
const {a,
b,c} = obj;`,
          errors: [{message: 'Object properties must go on a new line if they aren\'t all on the same line'}],
          output: `const obj = {a: 1, b: 2, c: 3}; 
const {a,
b,
c} = obj;`,
        },
        {
          name: 'multiple line',
          code: `const obj = {a: 1, b: 2, c: 3, d: 4}; 
const {a,b,
c,d} = obj;`,
          errors: [{message: 'Object properties must go on a new line if they aren\'t all on the same line'}],
          output: `const obj = {a: 1, b: 2, c: 3, d: 4}; 
const {a,
b,
c,
d} = obj;`,
        },
      ],
    },
  );
});
