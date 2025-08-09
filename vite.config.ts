import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import securityHeaders from './src/utils/securityHeaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), securityHeaders()],
  base: '/beratmen/', // Add base path for GitHub Pages
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Production'da sourcemap'i kapat
    minify: 'esbuild', // esbuild daha hızlı
    target: 'esnext', // Modern tarayıcılar için optimize et
    chunkSizeWarningLimit: 1000, // 1MB limit
    rollupOptions: {
      output: {
        // Vendor kütüphanelerini ayrı chunk'lara böl
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
          markdown: ['react-markdown', 'react-syntax-highlighter'],
          utils: ['dompurify', 'secure-ls']
        },
        // Chunk dosya adlarını optimize et
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Gzip sıkıştırma için
    cssCodeSplit: true,
    reportCompressedSize: false // Build süresini hızlandır
  },
  // CSS optimizasyonu
  css: {
    devSourcemap: false
  },
  // Dependency pre-bundling optimizasyonu
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})