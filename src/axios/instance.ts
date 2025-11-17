import axios from 'axios';
export const instance = axios.create({
  baseURL: 'https://www.team4.p-e.kr/api', //env 환경변수로 설정하기
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, //리프레쉬토큰의 쿠키 송수신 허용
});

export const diaryInstance = axios.create({
  baseURL: 'https://www.team4.p-e.kr/api',
  timeout: 1000,
});

//로그인시 유효성 검사 메세지는 숨겨
//패스워드 확인도 같이 보내나ㅏ?
