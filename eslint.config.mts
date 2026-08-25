import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';



export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      '@stylistic': stylistic
    },
    extends: [
      'js/recommended'
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        projectService: true
      },
      ecmaVersion: 2020
    },
    rules: {
      'array-element-newline': ['error', {
        ArrayExpression: 'consistent',
        ArrayPattern: {
          minItems: 4
        }
      }],
      'arrow-body-style': ['error', 'always'],
      'brace-style': 'error',
      'comma-dangle': ['error', 'never'],
      'curly': ['error', 'all'],
      'indent': 'off',
      'object-curly-newline': 'off',
      'object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'semi': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@stylistic/indent': [
        'error',
        2,
        {
          ignoredNodes: [
            'JSXElement',
            //'JSXElement *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild'
          ],
          ImportDeclaration: 'first'
        }
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            consistent: true,
            minProperties: 1,
            multiline: true
          },
          ObjectPattern: {
            consistent: true,
            multiline: true,
            minProperties: 1
          },
          ImportDeclaration: {
            consistent: true,
            multiline: true,
            minProperties: 4
          },
          ExportDeclaration: {
            consistent: true,
            multiline: true,
            minProperties: 4
          }
        }
      ]
    },
    settings: {
      react: {
        version: '18.3.1'
      }
    }
  },
  {
    files: ['**/*.json'],
    plugins: {
      json
    },
    language: 'json/json',
    extends: ['json/recommended']
  }
]);
