import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/authStore';

const HeaderAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});
// 로고 추가시 삽입
// const Logo = styled('img')({
//   height: '32px',
//   cursor: 'pointer',
// });
const LocationButton = styled(Button)({
  color: '#666666',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '400',
  '& .MuiButton-startIcon': {
    color: '#ff6b6b',
  },
});
const NavBar = styled(Box)({
  backgroundColor: '#2c4a8f',
  padding: '12px 0',
  position: 'relative',
});
const NavButton = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 500,
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
const AdminButton = styled(Button)({
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  position: 'absolute',
  right: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
});
export const Header = () => {
  const navigator = useNavigate();
  const userStore = useAuthStore();
  const userData = userStore.user;

  const handleLogOut = () => {
    userStore.clearAuth();
    alert('로그아웃 성공!!!! ');
    navigator('/');
  };
  console.log(userStore);
  console.log(userData?.name);
  return (
    <>
      <HeaderAppBar position='static'>
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <LocationButton startIcon={'🔜'}>수원시 영통구</LocationButton>
          {/* <Logo src='/aws-logo.png' alt='AWS' /> 로고 추가시 이미지 여기에 넣기*/}
          <Box sx={{ width: '120px' }} />
        </Toolbar>
      </HeaderAppBar>
      <NavBar>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <NavButton href='/'>Today</NavButton>
          <NavButton href='/diary'>날씨 일기장</NavButton>
          {/* 날씨 일기장 처리필요 */}

          {userData === null ? (
            <>
              <NavButton href='/login'>로그인</NavButton>
              <NavButton href='/signup'>회원가입</NavButton>
            </>
          ) : (
            <>
              <NavButton href='/mypage'>마이페이지</NavButton>
              <NavButton onClick={handleLogOut}>로그아웃</NavButton>
            </>
          )}
          {/* {userState === 'admin' && <AdminButton>관리자전용</AdminButton>} */}
        </Box>
      </NavBar>
    </>
  );
};
