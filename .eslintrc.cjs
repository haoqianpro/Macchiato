module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:perttier/recommended',
    'eslint-config-prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  rules: {}
}
