/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'After if, a single line is forced to display one line',
      recommended: true,
      url: 'https://github.com/xyhxx/eslint-plugin-xyhxx/blob/master/docs/if-line.md',
    },
    fixable: 'code',
    messages: {
      ifMessage: '\'if\' and content need to be on the same line.',
      elseMessage: '\'else\' and content need to be on the same line.',
    },
  },
  create(context) {
    return {
      IfStatement(node) {
        if (!node.consequent || node.consequent.type === 'BlockStatement') return;

        const sourceCode = context.getSourceCode();
        const before = sourceCode.getTokenBefore(node.consequent);

        if (before.loc.end.line !== node.consequent.loc.start.line) {
          context.report({
            node: node.consequent,
            messageId: 'ifMessage',
            fix(fixer) {
              return fixer.replaceTextRange([
                before.range[1],
                node.consequent.range[0],
              ], ' ');
            },
          });
        }

        if (node.alternate && node.alternate.type !== 'BlockStatement') {
          const altBefore = sourceCode.getTokenBefore(node.alternate);

          if (altBefore.loc.end.line !== node.alternate.loc.start.line) {
            context.report({
              node: node.alternate,
              messageId: 'elseMessage',
              fix(fixer) {
                return fixer.replaceTextRange([
                  altBefore.range[1],
                  node.alternate.range[0],
                ], ' ');
              },
            });
          }
        }
      },
    };
  },
};

