// src/features/auth/api/authApi.ts

import { RequestLoginDTO, RequestSignUpDTO, ResponseLoginDTO } from '../types/auth';

//MSW와 통신하는 API로직
//* (fetch 사용 )
//! 비동기 함수 호출은 꼭 반환타입도 명시하기.
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

//! 반환타입 로그인 (토큰 + 유저 정보 받음)
export async function logIn(data: RequestLoginDTO): Promise<ResponseLoginDTO> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('로그인실패!');
  }

  return res.json();
}
