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
        let preline = node.loc.start.line;

        if (node.properties.every(function(val) {
          return val.loc.start.line === preline;
        })) return;

        for (let i = 0; i < len; i++) {
          const temp = node.properties[i];
          const {line} = temp.loc.start;

          if (preline === line) {
            return context.report({
              node,
              message: 'Object properties must go on a new line if they aren\'t all on the same line',
              fix(fixer) {
                let preline = node.properties[0].loc.start.line;
                const result = [];
                for (let i = 1; i < len; i++) {
                  const temp = node.properties[i];
                  const {line} = temp.loc.start;

                  if (line === preline)
                    result.push(fixer.insertTextBefore(temp, '\n'));

                  preline = line;
                }

                return result;
              },
            });
          }

          preline = line;
        }
      },
    };
  },
};

