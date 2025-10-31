import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite 설정
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src를 @로 접근 가능하게
    },
  },
  css: {
    postcss: './postcss.config.cjs', // PandaCSS용 PostCSS 설정 연결
  },
});
