import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import securityHeaders from './src/utils/securityHeaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), securityHeaders()],
  base: '/', // Changed from '/beratmen/' for hosting
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemap in production
    minify: 'esbuild', // esbuild is faster
    target: 'esnext', // Optimize for modern browsers
    chunkSizeWarningLimit: 1000, // 1MB limit
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
          markdown: ['react-markdown', 'react-syntax-highlighter'],
          utils: ['dompurify', 'secure-ls']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable Gzip compression
    cssCodeSplit: true,
    reportCompressedSize: false // Speed up build process
  },
  // CSS optimization
  css: {
    devSourcemap: false
  },
  // Dependency pre-bundling optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})