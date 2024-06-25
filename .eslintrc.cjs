/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        ignoredNodes: ['ConditionalExpression']
      }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
    'no-duplicate-imports': ['error'],
    eqeqeq: ['error'],
    'logical-assignment-operators': ['error'],
    'no-console': ['warn'],
    'no-empty': ['error'],
    'no-empty-function': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-var': ['error'],
    'operator-assignment': ['error', 'always'],
    // 'array-bracket-newline': [
    //   'error',
    //   { 'multiline': true }
    // ],
    // 'array-bracket-spacing': [
    //   'error',
    //   'always'
    // ],
    // 'array-element-newline': [
    //   'error',
    //   { 'minItems': 2 }
    // ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
    'prettier/prettier': 'error'
    // 'prettier/prettier': ['error', { endOfLine: 'off' }],
  }
}
