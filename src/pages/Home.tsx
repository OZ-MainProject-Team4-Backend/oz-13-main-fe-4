import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/authStore';

export default function Home() {
  const userAuth = useAuthStore();
  const navigator = useNavigate();
  //로그아웃기능(zustand의 스토어 활용)
  const handleLogout = () => {
    userAuth.clearAuth();
    navigator('/');
  };
  return (
    <div>
      <h1>홈페이지 입니다.</h1>
      {userAuth.user?.name ? (
        <h1>{`${userAuth.user?.name}님 로그인증`}</h1>
      ) : (
        <p>로그인 필요합니다.</p>
      )}
      <Button variant='contained' color='secondary' onClick={handleLogout}>
        로그아웃하기
      </Button>
      <Link to={'/login'}>로그인하기</Link>
    </div>
  );
}
