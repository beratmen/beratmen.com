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
    sourcemap: true,
  }
})