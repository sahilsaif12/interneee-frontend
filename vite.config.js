import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/v1': 'http://localhost:8000/api'
      '/v1': 'https://interneee-backend.vercel.app/api'
    }
  },
  plugins: [react()],
})
