import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tokens, User } from '../types/auth';

//- JWT token에서 액세스만 추가함(액세스와 자동로그인 처리만 전역메모리로 저장이 된다)
type AuthState = {
  user: User | null; //유저의 타입 설정함
  accessToken: string | null;
  isAutoLogin: boolean; //자동로그인 분기처리 localStorage저장
  setAuth: (user: User, token: Tokens, isAutoLogin: boolean) => void; // 로그인 시 user, tokens, 자동로그인 여부 저장
  setAccessToken: (token: string) => void; //새로 발급받은 액세스토큰 업데이트
  clearAuth: () => void; //로그아웃 시 호출
  getAccessToken: () => string | null; //새로 액세스 토큰을 발급해줌
};

//- Zustand 스토어 (JWT 유저정보와 로그인여부만 로컬에 저장)
/* persist 안에 accessToken을 넣은 건 Zustand 상태 관리용
실제 localStorage 저장 여부는 partialize가 결정
accessToken은 의도적으로 localStorage에서 제외됨 (보안)
따라서 메모리에만 저장되는 게 맞다.
동작 방식:
전체 상태: user, accessToken, isAutoLogin
localStorage 저장: user, isAutoLogin만 (partialize로 필터링)
메모리에만: accessToken
*/
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //초기 전역 상태
      user: null,
      accessToken: null,
      isAutoLogin: false,

      //로그인시 호출
      setAuth: (user, tokens, isAutoLogin) =>
        set({
          user,
          accessToken: tokens.accessToken, //새로고침하면 null초기화
          isAutoLogin,
        }),

      //액세스 토큰 갱신 시 사용됨
      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      // 리프레쉬토큰으로 새로운 액세스 토큰 발급 받기
      getAccessToken: () => get().accessToken,

      //로그아웃시 토큰클리어
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          isAutoLogin: false,
        }),
    }),
    {
      name: 'auth-storage',
      //로컬에는 유저정보와 자동로그인 체크 여부만 저장함
      //선택적으로 저장이 되어야 하는 것
      partialize: (state) => ({
        user: state.user,
        isAutoLogin: state.isAutoLogin,
      }),
    }
  )
);
