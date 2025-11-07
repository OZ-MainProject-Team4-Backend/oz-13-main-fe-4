import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth';

//- 토큰없이 쿠키로!
type AuthState = {
  user: User | null; //유저의 타입 설정함
  setAuth: (user: User) => void; // 로그인 시 호출
  clearAuth: () => void; //로그아웃 시 호출
};

//-Zustand 스토어
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, //초기값
      setAuth: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    { name: 'auth-storage' } //실제 로컬에 저장되는 이름
  )
);
