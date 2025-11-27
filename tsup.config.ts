import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // CommonJS, ES Module 둘 다 지원 (Dual Package)
  dts: true, // .d.ts 파일 생성
  splitting: false,
  sourcemap: true,
  clean: true, // 빌드 전 dist 폴더 정리
  treeshake: true, // 트리쉐이킹 활성화
  minify: true, // 코드 압축
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
      '@core': './src/core',
      '@types': './src/types',
    };
  },
});
