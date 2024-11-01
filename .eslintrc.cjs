module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:import/recommended', 'plugin:jsx-a11y/recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-prettier',],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        "react/react-in-jsx-scope": "off",
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
