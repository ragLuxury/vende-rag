import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
      'boundaries/include': ['src/**/*', 'app/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'app/**/*' },
        { type: 'shared-ui', pattern: 'src/shared/ui/**/*' },
        { type: 'shared-domain', pattern: 'src/shared/domain/**/*' },
        { type: 'shared-infra', pattern: 'src/shared/infrastructure/**/*' },
        { type: 'domain', pattern: 'src/features/*/domain/**/*', capture: ['feature'] },
        {
          type: 'application',
          pattern: 'src/features/*/application/**/*',
          capture: ['feature'],
        },
        {
          type: 'infrastructure',
          pattern: 'src/features/*/infrastructure/**/*',
          capture: ['feature'],
        },
        {
          type: 'presentation',
          pattern: 'src/features/*/presentation/**/*',
          capture: ['feature'],
        },
      ],
    },
    // TODO: migrate to boundaries/dependencies (v6 schema) once stable docs are clearer.
    // Legacy element-types rule works and enforces the same constraints.
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['presentation', 'infrastructure', 'shared-ui', 'shared-infra'] },
            {
              from: 'presentation',
              allow: [
                ['presentation', { feature: '${from.feature}' }],
                ['application', { feature: '${from.feature}' }],
                ['domain', { feature: '${from.feature}' }],
                'shared-ui',
                'shared-domain',
              ],
            },
            {
              from: 'application',
              allow: [['domain', { feature: '${from.feature}' }], 'shared-domain'],
            },
            {
              from: 'infrastructure',
              allow: [
                ['domain', { feature: '${from.feature}' }],
                ['application', { feature: '${from.feature}' }],
                'shared-domain',
                'shared-infra',
              ],
            },
            { from: 'domain', allow: ['shared-domain'] },
            { from: 'shared-ui', allow: ['shared-ui', 'shared-domain'] },
            { from: 'shared-infra', allow: ['shared-infra', 'shared-domain'] },
            { from: 'shared-domain', allow: ['shared-domain'] },
          ],
        },
      ],
    },
  },
  // Google TS Style Guide rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Types
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Variables & control flow
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-param-reassign': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Default exports forbidden globally — overridden below for Next.js conventions.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message:
            'Default exports are forbidden by the Google TS Style Guide. Use a named export. (Next.js convention files are exempt.)',
        },
      ],

      // Naming convention (subset of Google style)
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE', 'PascalCase'] },
        {
          selector: 'property',
          format: null,
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
      ],
    },
  },

  // Allow default exports for Next.js file conventions
  {
    files: [
      'app/**/page.tsx',
      'app/**/layout.tsx',
      'app/**/loading.tsx',
      'app/**/error.tsx',
      'app/**/not-found.tsx',
      'app/**/template.tsx',
      'app/**/default.tsx',
      'app/**/global-error.tsx',
      'app/**/route.ts',
      'middleware.ts',
      'instrumentation.ts',
      'next.config.ts',
      'vitest.config.ts',
      'commitlint.config.ts',
      '*.config.{ts,mjs,js}',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
]);

export default eslintConfig;
