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
    // turning this off since we don't hard-require react imports in current version 
    'react/react-in-jsx-scope': 'off',
    // turning this off since we use useEffect as componentDidMount()
    'react-hooks/exhaustive-deps': 'off',
  },
  ignorePatterns: [
    '.eslintrc.js',
    '.prettierrc.js',
    'babel.config.js',
    'metro.config.js',
    'AuthService.js'
  ]
};
