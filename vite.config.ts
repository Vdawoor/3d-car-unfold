import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/3d-car-unfold/',
  server: {
    proxy: {
      '/api': {
        target: 'https://threed-car-unfold.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
