module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': 2,
        '@typescript-eslint/consistent-type-exports': 2,
        '@typescript-eslint/no-empty-interface': 2,
        '@typescript-eslint/no-type-alias': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-extra-non-null-assertion': 2,
        '@typescript-eslint/no-empty-function': 2,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/await-thenable': 0,
        '@typescript-eslint/no-misused-promises': 0,
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error'],
  },
};
