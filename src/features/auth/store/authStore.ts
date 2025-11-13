import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
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

//- Zustand 동적 스토어(StateStorage미들웨어?!)
const dynamicStorage: StateStorage = {
  getItem: (name: string) => {
    // 두 저장소 모두 확인 (우선순위: localStorage -> sessionStorage)
    const localValue = localStorage.getItem(name);
    const sessionValue = sessionStorage.getItem(name);
    return localValue || sessionValue;
  },
  setItem: (name: string, value: string) => {
    try {
      const state = JSON.parse(value);
      // isAutoLogin 값에 따라 저장소 선택
      if (state.state?.isAutoLogin) {
        localStorage.setItem(name, value);
        sessionStorage.removeItem(name);
      } else {
        sessionStorage.setItem(name, value);
        localStorage.removeItem(name);
      }
    } catch (error) {
      // JSON 파싱 실패 시 기본적으로 sessionStorage 사용
      sessionStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};
//- Zustand 기본 스토어

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //초기 전역 상태
      user: null,
      access: null,
      isAutoLogin: false,

      //로그인시 호출
      setAuth: (user, accesstoken, isAutoLogin) => {
        set({
          user,
          access: accesstoken,
          isAutoLogin,
        });
      },

      //액세스 토큰 갱신 시 사용됨
      setAccessToken: (accesstoken) => {
        set({
          access: accesstoken,
        });
      },

      // 액세스 토큰 반환
      getAccessToken: () => get().access,

      //로그아웃시 토큰클리어
      clearAuth: () => {
        set({
          user: null,
          access: null,
          isAutoLogin: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => dynamicStorage),
    }
  )
);
