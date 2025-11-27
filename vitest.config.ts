import { defineConfig } from 'vitest/config';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.config.*'],
    },
    include: ['src/tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@types': path.resolve(__dirname, './src/types'),
      '@error': path.resolve(__dirname, './src/error'),
    },
  },
});
