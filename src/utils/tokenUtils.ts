import { TokenPayload } from '../features/auth/types/auth';

/**
 * JWT 디코딩 (Base64)
 * @returns 사용자 정보 (userId, email, username 등 - 서버가 포함시킨 정보), 해당 액세스 토큰의 만료 시간 (exp claim)
토큰 발급 시간 (iat claim)
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

  const now = Date.now() / 1000;
  return decoded.exp < now;
}

/*
Token 만료 임박 체크 (5분전)
@returns true = 갱신 필요, false = 아직 괜찮음
 */
export function shouldRefreshToken(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const now = Date.now() / 1000;
  const fiveMinutes = 5 * 60;
  return decoded.exp - now < fiveMinutes;
}
