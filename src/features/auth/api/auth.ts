// src/features/auth/api/authApi.ts

import {
  RequestEmailSendDTO,
  RequestEmailVerifyDTO,
  RequestLoginDTO,
  RequestNicknameValidateDTO,
  RequestSignUpDTO,
  ResponseEmailSendDTO,
  ResponseEmailVerifyDTO,
  ResponseLoginDTO,
  ResponseNicknameValidateDTO,
} from '../types/auth';

//- ==================== 닉네임 검증 ====================
export async function validateNickname(
  data: RequestNicknameValidateDTO
): Promise<ResponseNicknameValidateDTO> {
  const res = await fetch('/api/auth/nickname/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || '닉네임 검증 실패');
  }
  return json;
}

//- ==================== 이메일 검증 ====================
export async function sendEmailCode(data: RequestEmailSendDTO): Promise<ResponseEmailSendDTO> {
  const res = await fetch('/api/auth/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || '이메일 발송 실패');
  }
  return json;
}

//- ==================== 이메일 코드 검증 ====================
export async function verifyEmailCode(
  data: RequestEmailVerifyDTO
): Promise<ResponseEmailVerifyDTO> {
  const res = await fetch('/api/auth/email/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || '인증 코드 검증 실패');
  }

  return json;
}

//- ==================== 회원가입 ====================
export async function signUp(data: RequestSignUpDTO): Promise<{ message: string }> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('회원가입 실패');
  }

  return res.json();
}
//- ==================== 로그인 ====================
export async function logIn(data: RequestLoginDTO): Promise<ResponseLoginDTO> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message || '로그인 실패');
  }

  return json;
}
//- ==================== 로그아웃 ====================
export async function logOut(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
  });
}
