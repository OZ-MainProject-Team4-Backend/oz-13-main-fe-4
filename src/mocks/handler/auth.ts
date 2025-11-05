import { http, HttpResponse } from 'msw';
import { RequestSignUpDTO } from '../../features/auth/types/auth';
import { mockPasswords, mockUsers } from '../data/user';

// src/mocks/handlers/auth.ts
export const authHandlers = [
  // 회원가입 API
  http.post('/api/auth/signup', async ({ request }) => {
    const body = (await request.json()) as RequestSignUpDTO;

    // 닉네임 중복 체크
    const existingNickname = mockUsers.find((user) => user.nickname === body.nickname);
    if (existingNickname) {
      return HttpResponse.json({ error: '닉네임 중복' }, { status: 400 });
    }

    // 새 유저 생성
    const newUser = {
      id: mockUsers.length + 1,
      email: body.email,
      nickname: body.nickname,
      name: body.name,
      phone: body.phone,
      gender: body.gender,
      age: body.age,
      is_verified: false,
    };

    mockUsers.push(newUser);
    mockPasswords.set(body.email, body.password);

    return HttpResponse.json({ message: '회원가입 완료' }, { status: 201 });
  }),
];
