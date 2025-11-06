import { useMutation } from '@tanstack/react-query';
import { logIn } from '../api/auth';
import { useAuthStore } from '../store/authStore';

//로그인 훅 생성
//기존에 만들었던 fetch함수 여기로 불러오기
export const useLogInMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      //api통신 성공하면, MSW응답한 data의 토큰값과 유저정보는 store에 저장해줘야함
      useAuthStore.getState().setAuth(data.token, data.user);
    },
  });
};
