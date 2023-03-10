module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        'comma-dangle': [2, 'always-multiline']
      }
    ],
    'react/react-in-jsx-scope': 'off'
  },
  ignorePatterns: [
    '.eslintrc.js',
    '.prettierrc.js',
    'babel.config.js',
    'metro.config.js',
    'AuthService.js'
  ]
};
