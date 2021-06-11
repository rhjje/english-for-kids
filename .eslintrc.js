module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
      "no-restricted-syntax": [0],
      "comma-dangle": ["error", "never"],
      "no-param-reassign": [1, { "props": false }]
    },
};

