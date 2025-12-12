import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Serve from root for dev, preview, and build to avoid subpath routing issues
  base: '/',
  plugins: [react()],
})
