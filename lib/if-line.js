/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'lay',
    docs: {
      description: 'After if, a single line is forced to display one line',
      recommended: true,
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

