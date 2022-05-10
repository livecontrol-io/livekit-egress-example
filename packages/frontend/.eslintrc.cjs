module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['tailwind.config.cjs', 'postcss.config.cjs'],
  extends: ['plugin:tailwindcss/recommended', 'plugin:react/recommended'],
  plugins: ['tailwindcss'],
  overrides: [
    {
      files: ['*.tsx', '*.scss', '*.css'],
      extends: ['plugin:tailwindcss/recommended'],
      rules: {
        'tailwindcss/no-custom-classname': 0,
      },
    },
    {
      files: ['*.tsx'],
      extends: ['plugin:react/recommended'],
      rules: {
        'react/jsx-uses-react': 2,
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
      },
    },
  ],
};
