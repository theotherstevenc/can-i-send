import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from './package.json'

import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  optimizeDeps: { exclude: ['node_modules/.cache'] },
  plugins: [
    react(),
    visualizer(),
    createHtmlPlugin({
      inject: {
        data: {
          appVersion: pkg.version,
        },
      },
    }),
  ],
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
        entryFileNames: `assets/[name].v${pkg.version}.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('crypto-js')) return 'crypto'
            if (id.includes('firebase')) return 'firebase'
            if (id.includes('monaco-editor')) return 'monaco'
            if (id.includes('@mui/icons-material')) return 'mui-icons'
            if (id.includes('@mui/material')) return 'mui-material'
            if (id.includes('react-tag-input-component')) return 'tag-input'
            return 'vendor'
          } else {
            return undefined
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
