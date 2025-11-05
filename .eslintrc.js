/** @type {import("eslint").Linter.Config} */
module.exports = {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  };
  