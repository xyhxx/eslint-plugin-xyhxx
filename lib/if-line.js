/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'lay',
    docs: {
      description: 'After if, a single line is forced to display one line',
      recommended: true,
      url: 'https://github.com/xyhxx/eslint-plugin-xyhxx/blob/master/docs/if-line.md',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      IfStatement(node) {
        if (!node.consequent || node.consequent.type === 'BlockStatement') return;

        const sourceCode = context.getSourceCode();
        const before = sourceCode.getTokenBefore(node.consequent);

        if (before.loc.end.line !== node.consequent.loc.start.line) {
          context.report({
            node,
            loc: {
              start: node.consequent.loc.start,
              end: node.consequent.loc.end,
            },
            message: 'if and content need to be on the same line',
            fix(fixer) {
              return fixer.replaceTextRange([
                before.range[1],
                node.consequent.range[0],
              ], '');
            },
          });
        }
      },
    };
  },
};

