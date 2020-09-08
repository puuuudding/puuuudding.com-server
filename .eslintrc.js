const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: ['airbnb-typescript/base'],
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
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'arrow-parens': [ERROR, 'as-needed', { 'requireForBlockBody': true }],
  },
};
