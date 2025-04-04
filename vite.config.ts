import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Allow all hosts To support using tools like ngrok during development
    allowedHosts: true
  },
  plugins: [react()],
})
