module.exports = {
  env: { browser: true, es2020: true },
  extends: ['react-app', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'no-debugger': 'warn',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};
