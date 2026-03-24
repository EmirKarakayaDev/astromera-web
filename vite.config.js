import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'lenis'],
          'sanity-vendor': ['sanity', '@sanity/client', '@sanity/image-url'],
          'swiper-vendor': ['swiper'],
        }
      }
    }
  }
})
