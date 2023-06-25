const {RuleTester} = require('eslint');
const {rules} = require('../lib');
const {it} = require('vitest');

const tester = new RuleTester();

it('if-line', function() {
  tester.run(
    'if-line',
    rules['if-line'],
    {
      valid: [
        {
          name: 'one line',
          code: 'function test(value){if(value > 10) return 12; return 22}',
        },
        {
          name: 'has BlockStatement',
          code: `function test(value){
            if(value > 10) {
              return '';
            }
  
            return '123';
          }`,
        },
      ],
      invalid: [
        {
          name: 'fix code',
          code: `
          function test(value){
            if(value > 10) 
            return '';
  
            return '123';
          }`,
          errors: [{messageId: 'ifMessage'}],
          output: `
          function test(value){
            if(value > 10) return '';
  
            return '123';
          }`,
        },
        {
          name: 'multiline',
          code: `function test(val) {
            if (
              val > 10 
              || val < 100
            )
              return '';
          }`,
          errors: [{messageId: 'ifMessage'}],
          output: `function test(val) {
            if (
              val > 10 
              || val < 100
            ) return '';
          }`,
        },
        {
          name: 'with else',
          code: `function test(val) {
            if (
              val > 10 
              || val < 100
            )
              return '';
            else 
              return '123';
          }`,
          errors: [
            {messageId: 'ifMessage'},
            {messageId: 'elseMessage'},
          ],
          output: `function test(val) {
            if (
              val > 10 
              || val < 100
            ) return '';
            else return '123';
          }`,
        },
      ],
    },
  );
});

