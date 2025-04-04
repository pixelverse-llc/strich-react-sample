import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {

    // Allow all hosts To support using tools like ngrok during development
    // Caveats apply: https://vite.dev/config/server-options.html#server-allowedhosts
    // Remove if not needed, or replace with domain, e.g. ['tunnel.mycorp.com']
    allowedHosts: true
  },
  plugins: [react()],
})
