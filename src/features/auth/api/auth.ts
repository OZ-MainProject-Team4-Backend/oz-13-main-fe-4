// src/features/auth/api/authApi.ts

import { RequestSignUpDTO } from '../types/auth';

export default async function signUp(data: RequestSignUpDTO) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '회원가입 실패');
  }

  return res.json();
}
