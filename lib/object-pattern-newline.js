/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Force one attribute per row when there are multiple rows of object patterns',
      recommended: true,
      url: 'https://github.com/xyhxx/eslint-plugin-xyhxx/blob/master/docs/object-pattern-newline.md',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      ObjectPattern(node) {
        const len = node.properties.length;

        if (node.properties.every(function(val) {
          return val.loc.start.line === node.loc.start.line;
        })) return;

        let preline = node.properties[0].loc.start.line;

        for (let i = 1; i < len; i++) {
          const temp = node.properties[i];
          const {line} = temp.loc.start;

          if (preline === line) {
            context.report({
              node: temp,
              message: `'${temp.value.name}' must go on a new line`,
              fix(fixer) {
                return fixer.insertTextBefore(temp, '\n');
              },
            });
          }

          preline = line;
        }
      },
    };
  },
};

