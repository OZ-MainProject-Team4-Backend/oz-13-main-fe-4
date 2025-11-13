import axios from 'axios';
export const instance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, //리프레쉬토큰의 쿠키 송수신 허용
});

export const diaryInstance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 1000,
});
