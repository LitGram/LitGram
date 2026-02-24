import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep warning signal for genuinely large bundles, but avoid false noise for this app size.
    chunkSizeWarningLimit: 1200,
  },
})
