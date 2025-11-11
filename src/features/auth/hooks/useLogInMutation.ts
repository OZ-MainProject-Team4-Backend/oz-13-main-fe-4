import { useMutation } from '@tanstack/react-query';
import { logIn } from '../api/auth';
import { useAuthStore } from '../store/authStore';

//로그인 성공시 JWT 토큰 저장 (sessionStorage)
export const useLogInMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (response) => {
      if (response.data?.user && response.data?.access && response.data?.refresh) {
        // ✅ user와 access 토큰을 sessionStorage에 저장
        useAuthStore.getState().setAuth(response.data.user, {
          access: response.data.access,
          refresh: response.data.refresh,
        });
      }
    },
  });
};
