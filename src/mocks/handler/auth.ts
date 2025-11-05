import { http, HttpResponse } from 'msw';
import {
  RequestLoginDTO,
  RequestSignUpDTO,
  ResponseLoginDTO,
} from '../../features/auth/types/auth';
import { mockPasswords, mockUsers } from '../data/user';

//에러타입
type ErrorResponse = {
  message: string;
};
// src/mocks/handlers/auth.ts
export const authHandlers = [
  // - 회원가입 API
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

  //- 로그인 API
  http.post<never, RequestLoginDTO, ResponseLoginDTO | ErrorResponse>(
    '/api/auth/login',
    async ({ request }) => {
      const { email } = await request.json(); //사용자의 이메일과 패스워드 받아옴

      //사용자 찾기
      const user = mockUsers.find((user) => user.email === email);

      //실패! 사용자 음슴
      if (!user) {
        return HttpResponse.json(
          { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
          { status: 401 }
        );
      }

      //성공~! 토큰과 사용자 정보 반환
      return HttpResponse.json<ResponseLoginDTO>(
        {
          token: 'mock-jwt-token-' + user.id,
          user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            name: user.name,
            phone: user.phone,
            gender: user.gender,
            age: user.age,
          },
        },
        { status: 200 }
      );
    }
  ),
];
