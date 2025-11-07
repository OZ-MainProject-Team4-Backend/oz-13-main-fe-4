import { create } from 'zustand';
import { User } from '../types/auth';

//- 토큰없이 쿠키로!
type AuthState = {
  user: User | null; //유저의 타입 설정함
  setAuth: (user: User) => void; // 로그인 시 호출
  clearAuth: () => void; //로그아웃 시 호출
};

//-Zustand 스토어
//- 쿠키 기반으로 전환함 persist제거
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setAuth: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));
