import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        clients: true,
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      eqeqeq: 2,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
