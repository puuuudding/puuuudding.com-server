const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
    commonjs: true,
    es2020: true,
    mongo: true,
  },
  rules: {
    'import/prefer-default-export': OFF,
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'arrow-parens': [ERROR, 'as-needed', { 'requireForBlockBody': true }],
    'no-underscore-dangle': [ERROR, {
      ...baseStyleRules['no-underscore-dangle'][1],
      allow: ['_id'],
    }],
    '@typescript-eslint/prefer-namespace-keyword': OFF,
    '@typescript-eslint/require-await': OFF,
    'class-methods-use-this': OFF,
  },
};
