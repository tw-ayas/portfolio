import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Ensure Vite can resolve the JSX runtimes from the installed react package
      { find: 'react/jsx-runtime', replacement: path.resolve(__dirname, 'node_modules/react/jsx-runtime.js') },
      { find: 'react/jsx-dev-runtime', replacement: path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js') },
    ],
  },
  server: {
    port: 3000, // Optional: Set the development server port
  },
  build: {
    outDir: 'build', // Optional: Match CRA's output directory
  },
  // assetsInclude: ['**/*.svg']
})
