// src/features/auth/api/authApi.ts

//MSW와 통신하는 API로직
//* (fetch 사용 )
// export default async function signUp(data: RequestSignUpDTO) {
//   const res = await fetch('/api/auth/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.error || '회원가입 실패');
//   }

//   return res.json();
// }

import axios from 'axios';
import {
  RequestLoginDTO,
  RequestSignUpDTO,
  ResponseLoginDTO,
  ResponseSignUpDTO,
} from '../types/auth';

//* Axios사용
//body타입은 리퀘스트타입으로 받아옴
//반환값은 프로미스의 리스폰스타입임
export const signUp = async (body: RequestSignUpDTO): Promise<ResponseSignUpDTO> => {
  const { data } = await axios.post('/api/auth/signup', body); //body받아서 넘겨주고 응답값은 data임 무조건
  return data;
};
export const logIn = async (body: RequestLoginDTO): Promise<ResponseLoginDTO> => {
  const { data } = await axios.post('/api/auth/login', body); //body받아서 넘겨주고 응답값은 data임 무조건
  return data;
};
