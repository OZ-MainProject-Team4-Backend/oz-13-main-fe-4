import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Tokens, User } from '../types/auth';

//- JWT 인증 상태 관리 (자동 로그인 기능 없음)
type AuthState = {
  user: User | null; //유저 정보
  access: string | null; //액세스 토큰
  setAuth: (user: User, token: Tokens) => void; // 로그인 시 user, tokens 저장
  setAccessToken: (token: string) => void; //새로 발급받은 액세스토큰 업데이트
  clearAuth: () => void; //로그아웃 시 호출
  getAccessToken: () => string | null; //액세스 토큰 반환
};

//- Zustand 스토어 (sessionStorage에 저장)
/* 동작 방식:
- 새로고침: ✅ 로그인 유지 (같은 탭)
- 새 탭: ❌ 로그아웃 (새 세션)
- 브라우저 닫고 재접속: ❌ 로그아웃
*/
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //초기 전역 상태
      user: null,
      access: null,

      //로그인시 호출
      setAuth: (user, tokens) =>
        set({
          user,
          access: tokens.access,
        }),

      //액세스 토큰 갱신 시 사용됨
      setAccessToken: (token) =>
        set({
          access: token,
        }),

      // 액세스 토큰 반환
      getAccessToken: () => get().access,

      //로그아웃시 토큰클리어
      clearAuth: () =>
        set({
          user: null,
          access: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
    }
  )
);
