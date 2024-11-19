import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  server: {
    historyApiFallback: true, // 모든 경로를 index.html로 리디렉션
    proxy: {
      '/api': {
          target: 'http://3.39.255.139:8080', // 요청을 보낼 서버
          changeOrigin: true, // 서버의 CORS 정책 무시
          rewrite: (path) => path.replace(/^\/api/, '') // /api를 제거
      }
  }
  }
})
