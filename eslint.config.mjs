// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // 1. 검사 대상 파일 지정
  { files: ['src/**/*.{ts,js}', 'tests/**/*.{ts,js}'] },

  // 2. 무시할 파일 지정 (기존 .eslintignore 역할)
  { ignores: ['dist', 'node_modules', 'coverage'] },

  // 3. 기본 설정 상속
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 4. Prettier 충돌 방지
  eslintConfigPrettier,

  // 5. 커스텀 규칙
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
