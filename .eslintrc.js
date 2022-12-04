module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        'comma-dangle': [2, 'always-multiline'],
      },
    ],
  },
  "ignorePatterns": [".eslintrc.js", ".prettierrc.js", "babel.config.js", "metro.config.js", "AuthService.js"],
};