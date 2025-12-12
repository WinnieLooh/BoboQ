import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Serve from subdirectory for GitHub Pages
  base: '/BoBoQ/',
  plugins: [react()],
})
