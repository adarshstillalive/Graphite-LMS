export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended', // Enables Prettier and integrates with ESLint
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error', // Display prettier errors as ESLint errors
    'react/react-in-jsx-scope': 'off', // Not required in modern React
    'react/jsx-props-no-spreading': 'off', // Optional preference
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.jsx', '.tsx'] }, // Allow JSX in .tsx files
    ],
  },
};
