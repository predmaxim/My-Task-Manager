import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);

// module.exports = {
//   extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
//   rules: {
//     semi: 'warn',
//     quotes: ['warn', 'single'],
//     'jsx-quotes': ['warn', 'prefer-double'],
//   },
//   plugins: ['@typescript-eslint', 'react', '@tanstack/eslint-plugin-query'],
//   settings: {
//     react: {
//       pragma: 'React',
//       version: 'detect',
//     },
//   },
// };
