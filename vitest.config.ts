import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['build/**'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      exclude: ['build/**', '*.config.*', 'src/types/**', 'src/interfaces/**', 'src/vite-env.d.ts'],
    },
  },
})
