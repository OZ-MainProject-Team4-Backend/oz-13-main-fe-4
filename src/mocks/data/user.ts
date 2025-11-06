// src/mocks/data/users.ts

import { ResponseSignUpDTO } from '../../features/auth/types/auth';

export const mockUsers: ResponseSignUpDTO[] = [
  {
    id: 1,
    email: 'test@example.com',
    nickname: 'testuser',
    name: '홍길동',
    phone: '01012345678',
    gender: 'male',
    age: 'twenty',
    is_verified: true,
  },
];

// 비밀번호는 별도 관리 (실제론 해시값)
export const mockPasswords = new Map([['test@example.com', 'test123']]);
