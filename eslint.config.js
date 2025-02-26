import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import importHelpers from 'eslint-plugin-import-helpers';

// Arquivo de configuração do ESLint
// Define as regras de lint para o projeto
// Padrão  formatação de código e boas práticas
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'eslint-plugin-import': importPlugin,
      'import-helpers': importHelpers,
    },
    // Regras de lint
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-expressions': 'off',
      'no-use-before-define': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/prop-types': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-shadow': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@//',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-array-index-key': 'off',
      'react/jsx-curly-newline': 'off',
      'react/no-unused-prop-types': 'off',
      'no-multi-assign': 'off',
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/no-unstable-nested-components': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/ban-types': 'off',
      'array-callback-return': 'off',
      'react/jsx-no-bind': 'off',
      'consistent-return': 'off',
      'react/button-has-type': 'off',
      'no-unused-vars': 'off',
      'react/require-default-props': 'off',
      'react/jsx-no-constructed-context-values': 'off',
      'no-param-reassign': 'off',
      'no-restricted-globals': 'off',
      'react/no-children-prop': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'react/jsx-no-useless-fragment': 'off',
    },
  }
);
