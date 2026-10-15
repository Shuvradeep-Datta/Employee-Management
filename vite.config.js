import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  tailwindcss  from '@tailwindcss/vite'
export default defineConfig({
  base: '/Employee-Management/',
  plugins: [
    react(),
    tailwindcss()
    
  ],
  server: {
    watch: {
      usePolling: true, // এটি ফাইল পরিবর্তন প্রতি মুহূর্তে নজর রাখে
    },
  },
   test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    clearMocks: true,
  },
})
