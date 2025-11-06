import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth';

//- 타입정의
type AuthState = {
  token: string | null; //유저의 토큰값 저장
  user: User | null; //유저의 타입 설정함
  setAuth: (token: string, user: User) => void; // 로그인 시 호출
  clearAuth: () => void; //로그아웃 시 호출
};

//-Zustand 스토어
/*
token, user 상태 관리
 setAuth, clearAuth 액션
 persist로 localStorage 동기화
  */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, //초기값
      user: null, //초기값
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    { name: 'localStore-name' } //실제 로컬에 저장되는 이름
  )
);
