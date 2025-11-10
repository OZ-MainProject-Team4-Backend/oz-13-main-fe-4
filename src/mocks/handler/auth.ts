import { http, HttpResponse } from 'msw';
import {
  RequestEmailSendDTO,
  RequestEmailVerifyDTO,
  RequestLoginDTO,
  RequestNicknameValidateDTO,
  RequestSignUpDTO,
  ResponseLoginDTO,
  ResponsetSignUpDTO,
} from '../../features/auth/types/auth';
import {
  emailVerificationCodes,
  mockPasswords,
  mockUsers,
  usedNicknames,
  verifiedEmails,
} from '../data/user';

// src/mocks/handlers/auth.ts
export const authHandlers = [
  //-==================== 닉네임 중복 검증 ====================
  http.post('/api/auth/nickname/validate', async ({ request }) => {
    //사용자가 입력한 닉네임
    const { nickname } = (await request.json()) as RequestNicknameValidateDTO;
    //서버 닉네임과 사용자 닉네임 일치 확인
    if (usedNicknames.has(nickname)) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'nickname_already_in_use',
            message: '이미 사용 중인 닉네임입니다',
          },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      success: true,
      statusCode: 200,
      message: '닉네임 사용가능',
    });
  }),

  //-==================== 이메일 인증 ====================
  http.post('/api/auth/email/send', async ({ request }) => {
    const { email } = (await request.json()) as RequestEmailSendDTO;
    //이메일 중복 확인
    if (verifiedEmails.has(email)) {
      return HttpResponse.json({
        success: false,
        statusCode: 400,
        error: {
          code: 'email_already_verified',
          message: '이미 인증이 된 이메일',
        },
      });
    }
    // 6자리 랜덤 코드 생성 -- 이거 우리가 ???
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    emailVerificationCodes.set(email, code);

    console.log(`📧 [MSW] 이메일 인증 코드 발송: ${email} -> ${code}`);

    //인증코드 발송 완료
    return HttpResponse.json({
      success: true,
      statusCode: 200,
      message: '인증 코드 발송완료',
    });
  }),

  //-==================== 이메일 인증 검증 ====================
  http.post('/api/auth/email/verify', async ({ request }) => {
    const { email, code } = (await request.json()) as RequestEmailVerifyDTO;
    //MSW임시 코드
    const saveCode = emailVerificationCodes.get(email);
    if (!saveCode || saveCode !== code) {
      return HttpResponse.json({
        success: false,
        statusCode: 400,
        error: {
          code: 'code_invalid_or_expired',
          message: '코드 만료 또는 불일치',
        },
      });
    }
    //인증완료
    verifiedEmails.add(email);
    emailVerificationCodes.delete(email);
    return HttpResponse.json({
      success: true,
      statusCode: 200,
      message: '이메일 인증 완료',
    });
  }),

  //- ==================== 회원가입 ====================
  http.post('/api/auth/signup', async ({ request }) => {
    const body = (await request.json()) as RequestSignUpDTO;
    const newUser = {
      id: mockUsers.length + 1,
      email: body.email,
      name: body.name,
      nickname: body.nickname,
      gender: body.gender,
      age: body.age,
      is_verified: true,
      created_at: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    mockPasswords.set(body.email, body.password); //이메일에 맞는 비밀번호로 세팅
    usedNicknames.add(body.nickname);

    return HttpResponse.json<ResponsetSignUpDTO>({
      success: true,
      statusCode: 201,
      message: '회원가입 완료',
      data: {
        user: newUser,
      },
    });
  }),

  //- ==================== 로그인 ====================
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as RequestLoginDTO;
    //사용자 찾기
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      return HttpResponse.json({
        success: false,
        statusCode: 400,
        error: {
          code: 'email_not_found',
          message: '존재하지 않는 이메일입니다',
        },
      });
    }

    const savedPW = mockPasswords.get(email);
    if (savedPW !== password) {
      return HttpResponse.json({
        success: false,
        statusCode: 401,
        error: {
          code: 'password_incorrect',
          message: '비밀번호가 일치하지 않습니다',
        },
      });
    }
    return HttpResponse.json<ResponseLoginDTO>(
      {
        success: true,
        statusCode: 200,
        message: '로그인 성공',
        data: { user },
      },
      //쿠키처럼 흉내내기 !!!!! 육안으로 확인 필요
      {
        status: 200,
        headers: {
          'Set-Cookie': 'access_token=mockToken; HttpOnly; Path=/;',
        },
      }
    );
  }),
  //- ==================== 로그아웃 ====================
  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  //- ==================== 마이페이지 조회  ====================
  http.get('/api/auth/me', () => {
    //실제로는 토큰값?쿠키값?으로 사용자 식별함
    const user = mockUsers[0];
    if (!user) {
      return HttpResponse.json({
        success: false,
        statusCode: 401,
        error: {
          code: 'unauthorized',
          message: '인증이 필요합니다',
        },
      });
    }
    return HttpResponse.json({
      success: true,
      statusCode: 200,
      data: {
        user,
      },
    });
  }),
];
