import { useMutation } from '@tanstack/react-query';
import { logIn } from '../api/auth';
import { useAuthStore } from '../store/authStore';

//로그인 성공시 JWT 토큰 저장 (localStorage via Zustand)
export const useLogInMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (response) => {
      if (response.data?.user && response.data?.access) {
        // ✅ user와 access 토큰을 Zustand store에 저장
        // (refresh 토큰은 서버에서 쿠키로 관리하므로 프론트에서 저장하지 않음)
        useAuthStore.getState().setAuth(response.data.user, response.data.access);
      }
    },
  });
};
