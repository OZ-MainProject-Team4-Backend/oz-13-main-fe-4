import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // 1️⃣ 소스 경로 설정
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // 2️⃣ 출력 경로 설정 (Panda가 생성하는 스타일 코드 위치)
  outdir: 'styled-system',

  // 3️⃣ 프리셋 (기본 테마 포함)
  presets: ['@pandacss/preset-panda'],

  // 4️⃣ 테마 커스터마이징
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: { value: '#1a73e8' },
        },
        fonts: {
          pretendard: { value: 'Pretendard, sans-serif' },
        },
      },
    },
  },

  // 5️⃣ global 스타일
  globalCss: {
    'html, body': {
      fontFamily: 'Pretendard, sans-serif',
      backgroundColor: '#fff',
      color: '#111',
    },
  },
});
