import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['build/**'],
    environment: 'jsdom',
    coverage: {
      exclude: ['build/**', '*.config.*'],
    },
  },
})
