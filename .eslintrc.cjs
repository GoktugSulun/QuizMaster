module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh', 
    'react',
    'react-hooks'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars": "error",
    'jsx-quotes': [2, 'prefer-double'],
    "semi": [2, "always"],
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'off',
    "quotes": [2, "single", { "avoidEscape": true }],
    "indent": ["error", 2],
    // "object-curly-newline": ["error", {
    //   "ObjectExpression": "always",
    //   "ObjectPattern": { "multiline": true },
    //   "ImportDeclaration": "never",
    //   "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    // }]
  }
}