import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: Set the development server port
  },
  build: {
    outDir: 'build', // Optional: Match CRA's output directory
  },
  // assetsInclude: ['**/*.svg']
})
