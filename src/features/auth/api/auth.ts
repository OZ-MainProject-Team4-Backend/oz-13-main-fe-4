// src/features/auth/api/authApi.ts

import axios from 'axios';
import { instance } from '../../../axios/instance';
import {
  RequestEmailSendDTO,
  RequestEmailVerifyDTO,
  RequestLoginDTO,
  RequestNicknameValidateDTO,
  RequestSignUpDTO,
  ResponseEmailSendDTO,
  ResponseEmailVerifyDTO,
  ResponseLoginDTO,
  ResponseMeDTO,
  ResponseNicknameValidateDTO,
  ResponseRefreshToken,
} from '../types/auth';

//- ==================== 닉네임 검증 ====================
export async function validateNickname(
  data: RequestNicknameValidateDTO
): Promise<ResponseNicknameValidateDTO> {
  try {
    const res = await instance.post('/api/auth/nickname/validate', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('닉네임 검증 중 오류가 발생했습니다');
  }
}

//- ==================== 이메일 검증 ====================
export async function sendEmailCode(data: RequestEmailSendDTO): Promise<ResponseEmailSendDTO> {
  try {
    const res = await instance.post('/api/auth/email/send', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('이메일 검증 오류');
  }
}

//- ==================== 이메일 코드 검증 ====================
export async function verifyEmailCode(
  data: RequestEmailVerifyDTO
): Promise<ResponseEmailVerifyDTO> {
  try {
    const res = await instance.post('/api/auth/email/verify', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('이메일 인증 코드 검증 실패');
  }
}

//- ==================== 회원가입 ====================
export async function signUp(data: RequestSignUpDTO): Promise<{ message: string }> {
  try {
    const res = await instance.post('/api/auth/signup', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('회원가입 실패');
  }
}
//- ==================== 로그인 ====================
export async function logIn(data: RequestLoginDTO): Promise<ResponseLoginDTO> {
  try {
    const res = await instance.post('/api/auth/login', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('로그인 실패');
  }
}
//- ==================== 리프레쉬토큰 ====================
export async function refreshToken(): Promise<ResponseRefreshToken> {
  try {
    const res = await instance.post('/api/auth/refresh');
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('리프레쉬토큰으로 액세스토큰발급 실패');
  }
}

//- ==================== 로그아웃 ====================
export async function logOut(): Promise<void> {
  try {
    await instance.post('/api/auth/logout');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('로그아웃 실패');
  }
}
//- ====================  마이페이지 조회 ====================
export async function getMe(): Promise<ResponseMeDTO> {
  try {
    const res = await instance.get('/api/auth/me');
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('프로필 조회 실패');
  }
}
