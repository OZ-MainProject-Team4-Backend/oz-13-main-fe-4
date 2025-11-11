import { useMutation } from '@tanstack/react-query';
import { refreshAccessToken } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export const useTokenRefresh = () => {
  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (response) => {
      // Access Token 갱신
      if (response.data?.access) {
        useAuthStore.getState().setAccessToken(response.data.access);
      }
    },
    onError: (error) => {
      console.error('Token refresh 실패:', error);
      // Refresh Token도 만료됨 → 로그아웃 처리
      useAuthStore.getState().clearAuth();
    },
  });
};
