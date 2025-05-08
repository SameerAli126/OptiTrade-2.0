import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api_v1": {
        target: "https://archlinux.tail9023a4.ts.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_v1/, ''),
      },
    },
  },
})
