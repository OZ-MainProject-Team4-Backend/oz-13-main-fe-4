import axios from 'axios';

//- 요청인터셉터(전역에서 동작)
axios.interceptors.request.use((config) => {
  // localStorage에서 JWT 토큰을 가져옴
  const token = localStorage.getItem('jwt');

  if (token) {
    // 토큰이 존재하면 Authorization 헤더에 추가
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 수정된 요청 설정 반환
  return config;
});

//- 응답인터셉터(전역에서동작)
// axios.interceptors.response.use(
//   (response) => {
//     // 성공적인 응답은 그대로 반환
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // 401(Unauthorized) 상태 코드가 발생하면 Access Token이 만료된 것으로 간주

//       // 새 Access Token 발급 요청 (Refresh Token 사용)
//       const refreshedToken = await refreshToken(); // refreshToken 함수는 새 Access Token을 서버에서 받아오는 함수

//       // 새로 발급받은 JWT 토큰을 localStorage에 저장
//       localStorage.setItem('jwt', refreshedToken);

//       // 원래 요청을 복제하여 Authorization 헤더를 새 토큰으로 갱신
//       const originalRequest = error.config;
//       originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

//       // 복제된 요청을 새 Access Token으로 재시도
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // Refresh Token이 만료되었거나, 발급 실패 시 추가 처리
//         console.error("Token refresh failed. Redirecting to login.");
//         redirectToLogin(); // 로그인 페이지로 리다이렉션
//         return Promise.reject(refreshError); // 새로운 에러 반환
//       }
//     }
//     return Promise.reject(error); // 기타 에러는 그대로 반환
//   }
// );
