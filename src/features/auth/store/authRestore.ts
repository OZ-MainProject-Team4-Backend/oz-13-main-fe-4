// src/features/auth/utils/authRestore.ts

import { refreshAccessToken } from '../api/auth';
import { useAuthStore } from '../store/authStore';

/**
 * 앱 초기화 시 자동 로그인 복원
 * localStorage의 isAutoLogin = true일 때만 실행
 */
export async function restoreAuth(): Promise<boolean> {
  const { isAutoLogin, user } = useAuthStore.getState();

  // 자동로그인 체크 안 했으면 스킵
  if (!isAutoLogin || !user) {
    return false;
  }

  try {
    // Refresh Token으로 새 Access Token 발급
    const response = await refreshAccessToken();

    if (response.data?.access) {
      useAuthStore.getState().setAccessToken(response.data.access);
      console.log('✅ 자동 로그인 복원 성공');
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ 자동 로그인 복원 실패:', error);
    // Refresh Token 만료 → 로그아웃
    useAuthStore.getState().clearAuth();
    return false;
  }
}
