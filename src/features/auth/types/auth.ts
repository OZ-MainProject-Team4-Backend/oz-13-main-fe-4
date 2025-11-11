// src/features/auth/types/auth.ts
//===========공통 타입 ============
export type User = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  gender: string;
  age: string;
  is_verified: boolean;
  favorite_regions?: string[]; // 마이페이지 조회 시에만 포함
  created_at: string;
};
export type ApiError = {
  code: string;
  message: string;
};
//unknown인 이유 : 제네릭 타입 인자가 없을 수 있으니깐(근데success,statusCode는 반드시 옴)
export type ApiResponse<T = unknown, K = unknown> = {
  success: boolean; //필수
  statusCode: number; //필수
  message?: string;
  error?: K;
  data?: T;
};

//==================== JWT 토큰 관련 ====================
export type Tokens = {
  access: string;
  refresh: string;
};

export type TokenPayload = {
  userId: number;
  email: string;
  exp: number; // 만료 시간 (unix timestamp)
  iat: number; // 발급 시간
};

//=========== 닉네임 검증 ============
export type RequestNicknameValidateDTO = {
  nickname: string;
};

export type ResponseNicknameValidateDTO = ApiResponse;

//=========== 이메일 인증 보내기 ============
export type RequestEmailSendDTO = {
  email: string;
};
export type ResponseEmailSendDTO = ApiResponse;

//=========== 이메일 인증 검증============
export type RequestEmailVerifyDTO = {
  email: string;
  code: string;
};
export type ResponseEmailVerifyDTO = ApiResponse;

//=========== 회원가입============
export type RequestSignUpDTO = {
  email: string;
  name: string;
  password: string;
  nickname: string;
  gender: string;
  age: string;
};

export type ResponsetSignUpDTO = ApiResponse<{
  user: User;
}>;
/* 요청 성공시 응답값은 아래처럼 받아옴
그래서 {user}의 타입을 제네릭으로 설정해야함.
"data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nickname": "abc",
      "gender": "M",
      "age": "25",
      "is_verified": true,
      "created_at": "2025-01-15T10:30:00Z"
    }
  } */

//=========== 로그인 ============
export type RequestLoginDTO = {
  email: string;
  password: string;
};

export type ResponseLoginDTO = ApiResponse<{
  user: User;
  access: string; // 🔐로그인 요청하면 서버에서 JWT토큰값 뱉어냄
  refresh: string; // 🔐로그인 요청하면 서버에서 JWT토큰값 뱉어냄
}>;
//=========== 마이페이지 ============
export type ResponseMeDTO = ApiResponse<User>;

//=========== 프로필수정 ============
export type RequestProfileUpdateDTO = {
  nickname?: string;
  gender?: string;
  email?: string;
  age?: string;
  password?: string;
};

export type ResponseProfileUpdateDTO = ApiResponse;

//==================== 즐겨찾는 지역 수정 ====================
export type RequestFavoriteRegionsUpdateDTO = {
  favorite_regions: string[]; // 최대 3개
};

export type ResponseFavoriteRegionsUpdateDTO = ApiResponse<{
  favorite_regions: string[];
}>;

//=========== 비밀번호 변경(새로덮는것임) ============
export type RequestPasswordChangeDTO = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

export type ResponsePasswordChangeDTO = ApiResponse;

//==================== 회원탈퇴 ====================
export type ResponseDeleteAccountDTO = ApiResponse<{
  deleted: boolean;
}>;
