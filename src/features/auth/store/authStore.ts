import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../types/auth';

//- JWT 인증 상태 관리
type AuthState = {
  user: User | null; //유저 정보
  access: string | null; //액세스 토큰
  isAutoLogin: boolean; //자동 로그인 여부
  setAuth: (user: User, accesstoken: string, isAutoLogin: boolean) => void; // 로그인 시 user, tokens, 자동로그인 여부 저장
  setAccessToken: (accesstoken: string) => void; //새로 발급받은 액세스토큰 업데이트
  clearAuth: () => void; //로그아웃 시 호출
  getAccessToken: () => string | null; //액세스 토큰 반환
};

//- Zustand 스토어

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //초기 전역 상태
      user: null,
      access: null,

      //로그인시 호출
      setAuth: (user, accesstoken) => {
        set({
          user,
          access: accesstoken,
        });
        // 인터셉터와 동기화를 위해 localStorage에도 직접 저장
        localStorage.setItem('jwt', accesstoken);
      },

      //액세스 토큰 갱신 시 사용됨
      setAccessToken: (accesstoken) => {
        set({
          access: accesstoken,
        });
        // 인터셉터와 동기화를 위해 localStorage에도 직접 저장
        localStorage.setItem('jwt', accesstoken);
      },

      // 액세스 토큰 반환
      getAccessToken: () => get().access,

      //로그아웃시 토큰클리어
      clearAuth: () => {
        set({
          user: null,
          access: null,
        });
        // localStorage의 jwt 키도 함께 제거
        localStorage.removeItem('jwt');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
