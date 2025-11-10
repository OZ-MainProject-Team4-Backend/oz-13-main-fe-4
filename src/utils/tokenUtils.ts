import { TokenPayload } from '../features/auth/types/auth';

/**
 * JWT 디코딩 (Base64)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.log('Token decode 실패 : ', error);
    return null;
  }
}

/**
 * Token 만료 체크
 * @returns true = 만료됨, false = 유효함
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const now = Date.now() / 1000; // 현재 시간 (초 단위)
  return decoded.exp < now;
}
