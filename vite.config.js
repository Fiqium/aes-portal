import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // 👈 This makes asset paths relative (e.g., ./assets/...)
  plugins: [
    react(), 
    tailwindcss()
  ],
  server: {
    port: 8080, // 👈 This forces the dev server to use 8080
  }
})