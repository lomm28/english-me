const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'prettier',
    'react-hooks'
  ],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'import/no-unresolved': 2,
    'react/sort-comp': [
      0
    ],
    'prettier/prettier': ['error', prettierOptions],
    'no-param-reassign': [
      'error',
      {
        'props': true,
        'ignorePropertyModificationsFor': [
          'self'
        ]
      }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ],
    'no-underscore-dangle': [
      'off'
    ],
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true
      }
    ],
    'no-shadow': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}