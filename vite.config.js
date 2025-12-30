import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({babel: {plugins: [['babel-plugin-react-compiler']],},}),],
    define: {
    global: 'globalThis',  // ✅ 이 줄 추가!
    'process.env': {}  // 이것도 추가
  },
  // server: {
  //   proxy: {
  //     '/ws': {
  //       target: 'http://localhost:8080',
  //       ws: true,  // WebSocket 프록시 필수!!
  //       changeOrigin: true
  //     }
  //   },
  //   hmr: false
  // },
})