import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

export default defineConfig({
  optimizeDeps: { exclude: ['node_modules/.cache'] },
  plugins: [react(), visualizer()],
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('crypto-js')) return 'crypto'
            if (id.includes('firebase')) return 'firebase'
            if (id.includes('monaco-editor')) return 'monaco'
            if (id.includes('@mui/icons-material')) return 'mui-icons'
            if (id.includes('@mui/material')) return 'mui-material'
            if (id.includes('react-tag-input-component')) return 'tag-input'
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
