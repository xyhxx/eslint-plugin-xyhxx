const ifLine = require('./if-line');
const objectPatternNewline = require('./object-pattern-newline');
const preferTernary = require('./prefer-ternary');

module.exports = {
  rules: {
    'if-line': ifLine,
    'object-pattern-newline': objectPatternNewline,
    'prefer-ternary': preferTernary,
  },
};
