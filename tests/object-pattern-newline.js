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
          errors: [{message: '\'c\' must go on a new line'}],
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
          errors: [
            {message: '\'b\' must go on a new line'},
            {message: '\'d\' must go on a new line'},
          ],
          output: `const obj = {a: 1, b: 2, c: 3, d: 4}; 
const {a,
b,
c,
d} = obj;`,
        },
        {
          name: 'function params',
          errors: [
            {message: '\'b\' must go on a new line'},
            {message: '\'d\' must go on a new line'},
          ],
          code: `function test({a,b, 
c,d}){}`,
          output: `function test({a,
b, 
c,
d}){}`,
        },
      ],
    },
  );
});
