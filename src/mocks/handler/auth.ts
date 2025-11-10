import { http, HttpResponse } from 'msw';
import {
  RequestEmailSendDTO,
  RequestEmailVerifyDTO,
  RequestLoginDTO,
  RequestNicknameValidateDTO,
  RequestSignUpDTO,
  RequestTokenRefreshDTO,
  ResponseLoginDTO,
  ResponseTokenRefreshDTO,
  ResponsetSignUpDTO,
} from '../../features/auth/types/auth';
import {
  emailVerificationCodes,
  mockPasswords,
  mockUsers,
  refreshTokenStore,
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
    // 이미 인증된 이메일인지 확인
    if (verifiedEmails.has(email)) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'email_already_verified',
            message: '이미 인증이 된 이메일',
          },
        },
        { status: 400 }
      );
    }

    // 이미 가입된 이메일인지 확인
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'email_duplicate',
            message: '이미 가입된 이메일입니다',
          },
        },
        { status: 400 }
      );
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
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'code_invalid_or_expired',
            message: '코드 만료 또는 불일치',
          },
        },
        { status: 400 }
      );
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
    const accessToken = 'mock-access-token-' + Date.now(); //몫데이터 임시 설장
    const refreshToken = 'mock-refresh-token-' + Date.now();
    mockUsers.push(newUser);
    mockPasswords.set(body.email, body.password); //이메일에 맞는 비밀번호로 세팅
    usedNicknames.add(body.nickname);

    //리프레쉬토큰에 사용자의 이메일과 리프레쉬토큰값 저장
    refreshTokenStore.set(body.email, refreshToken);

    //회원가입 성공 응답
    return HttpResponse.json<ResponsetSignUpDTO>(
      {
        success: true,
        statusCode: 201,
        message: '회원가입 완료',
        data: {
          user: newUser,
          access: accessToken,
          refresh: refreshToken,
        },
      },
      {
        status: 201,
        headers: {
          // HttpOnly 쿠키로 Refresh Token 설정 (자동로그인용)
          /* Max-Age=${60 * 60 * 24 * 7}; 는 얼마나? 몇시간?
          자동로그인 */
          'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}; Path=/`,
        },
      }
    );
  }),

  //- ==================== Token Refresh ====================
  http.post('/api/auth/refresh', async ({ request, cookies }) => {
    const body = (await request.json()) as RequestTokenRefreshDTO;

    //1. 쿠키에서 refreshToken확인 (자동로그인 체크시)
    let refreshToken = cookies.refreshToken;

    //2. 쿠키에 없으면 body에서 찾아봄 (자동로그인 미체크인)
    if (!refreshToken) {
      refreshToken = body.refresh as string;
    }

    //3. 리프레쉬토큰이 아예 없다면 ?
    if (!refreshToken) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'refresh_token_required',
            message: 'Refresh 토큰이 필요합니다',
          },
        },
        { status: 400 }
      );
    }

    //4. 리프레쉬토큰 검증(유저이메일과 매칭 - 저장소에 있는지 확인 )
    const userEmail = Array.from(refreshTokenStore.entries()).find(
      ([_, token]) => token === refreshToken
    )?.[0];
    if (!userEmail) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 401,
          error: {
            code: 'invalid_refresh_token',
            message: '유효하지 않은 Refresh 토큰',
          },
        },
        { status: 401 }
      );
    }

    // 5. 새 Access Token 발급
    const newAccessToken = 'mock-access-token-' + Date.now();

    return HttpResponse.json<ResponseTokenRefreshDTO>({
      success: true,
      statusCode: 200,
      message: '토큰 갱신 완료',
      data: {
        access: newAccessToken,
      },
    });
  }),

  //- ==================== 로그인 ====================
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password, isAutoLogin } = (await request.json()) as RequestLoginDTO;
    //사용자 찾기
    const user = mockUsers.find((u) => u.email === email);
    //토큰값
    const accessToken = 'mock-access-token-' + Date.now();
    const refreshToken = 'mock-refresh-token-' + Date.now();

    // Refresh Token 저장
    refreshTokenStore.set(email, refreshToken);

    //자동로그인 체크시 HTTPOnly쿠키 설정
    const headers: HeadersInit = {};

    if (isAutoLogin) {
      headers['Set-Cookie'] =
        `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}; Path=/`;
    }

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 400,
          error: {
            code: 'email_not_found',
            message: '존재하지 않는 이메일입니다',
          },
        },
        { status: 400 }
      );
    }

    const savedPW = mockPasswords.get(email);
    if (savedPW !== password) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 401,
          error: {
            code: 'password_incorrect',
            message: '비밀번호가 일치하지 않습니다',
          },
        },
        { status: 401 }
      );
    }
    return HttpResponse.json<ResponseLoginDTO>(
      {
        success: true,
        statusCode: 200,
        message: '로그인 성공',
        data: {
          user: user,
          access: accessToken,
          refresh: refreshToken,
        },
      },
      {
        status: 200,
      }
    );
  }),
  //- ==================== 로그아웃(토큰삭제) ====================
  http.post('/api/auth/logout', ({ cookies }) => {
    //쿠키로 저장된 리프레쉬 토큰 확인
    const refreshToken = cookies.refreshToken;
    if (refreshToken) {
      const userEmail = Array.from(refreshTokenStore.entries()).find(
        ([_, token]) => token === refreshToken
      )?.[0];

      if (userEmail) {
        refreshTokenStore.delete(userEmail);
      }
    }

    return new HttpResponse(null, {
      status: 204,
      headers: {
        //쿠키삭제
        'Set-Cookie': 'refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
      },
    });
  }),

  //- ==================== 마이페이지 조회  ====================
  http.get('/api/auth/me', () => {
    //실제로는 토큰값?쿠키값?으로 사용자 식별함
    const user = mockUsers[0];
    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          statusCode: 401,
          error: {
            code: 'unauthorized',
            message: '인증이 필요합니다',
          },
        },
        { status: 401 }
      );
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
