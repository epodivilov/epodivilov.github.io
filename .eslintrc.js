module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    'max-len': ['error', { code: 120 }],
    'import/prefer-default-export': 'off',
    'no-bitwise': 'off'
  },
};
