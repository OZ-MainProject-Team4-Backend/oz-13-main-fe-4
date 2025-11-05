// src/features/auth/types/auth.ts

//1. 백에 요청하는 유저의 정보
export type RequestSignUpDTO = {
  age: string;
  email: string;
  gender: string;
  name: string;
  nickname: string;
  password: string;
  phone: string;
};

//2. 백으로 응답받은 회원가입 상태 정보
export type ResponseSignUpDTO = {
  id: number;
  email: string;
  nickname: string;
  gender: string;
  name: string;
  phone: string;
  age: string;
  is_verified: boolean;
};
