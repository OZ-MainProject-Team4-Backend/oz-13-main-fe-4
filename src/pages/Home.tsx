import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>홈페이지 입니다.</h1>
      <h3>--님 로그인중</h3>
      <Button variant='contained' color='secondary'>
        로그아웃하기
      </Button>
      <Link to={'/login'}>로그인하기</Link>
    </div>
  );
}
