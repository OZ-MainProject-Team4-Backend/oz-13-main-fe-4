import { useMutation } from '@tanstack/react-query';
import { logIn } from '../api/auth';
import { useAuthStore } from '../store/authStore';

//로그인 성공시 쿠키로 사용자 관리
export const useLogInMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (response) => {
      if (response.data?.user && response.data?.access && response.data?.refresh) {
        // ✅ Tokens 객체로 전달
        useAuthStore.getState().setAuth(
          response.data.user,
          {
            access: response.data.access,
            refresh: response.data.refresh,
          },
          response.data.isAutoLogin || false // ✅ 자동로그인 여부
        );
      }
    },
  });
};
