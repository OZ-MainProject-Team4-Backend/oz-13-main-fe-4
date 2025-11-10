import { useMutation } from '@tanstack/react-query';
import { logIn } from '../api/auth';
import { useAuthStore } from '../store/authStore';

//로그인 성공시 쿠키로 사용자 관리
export const useLogInMutation = () => {
  return useMutation({
    mutationFn: logIn,
    onSuccess: (response) => {
      //api통신 성공하면, MSW응답한 data의  store에 저장해줘야함
      //- 서버가 쿠키로 인증 처리해주어서, 프론트에선 단순히 사용자 정보만 저장해주면 끝!!!
      if (response.data?.user) useAuthStore.getState().setAuth(response.data.user);
    },
  });
};
