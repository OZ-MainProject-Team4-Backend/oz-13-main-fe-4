import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

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
  const [userState, setUserState] = useState('prelogin');
  return (
    <>
      {/* 권한 변경 임시 토글 버튼 */}
      <Button
        onClick={() => {
          if (userState !== 'admin') {
            setUserState('admin');
            return;
          }
          setUserState('prelogin');
        }}
      >
        권한변경 {userState}
      </Button>
      <HeaderAppBar position='static'>
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <LocationButton startIcon={'🔜'}>수원시 영통구</LocationButton>
          {/* <Logo src='/aws-logo.png' alt='AWS' /> 로고 추가시 이미지 여기에 넣기*/}
          <Box sx={{ width: '120px' }} />
        </Toolbar>
      </HeaderAppBar>
      <NavBar>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <NavButton>Today</NavButton>
          <NavButton>날씨 일기장</NavButton>
          {userState === 'prelogin' && (
            <>
              <NavButton>로그인</NavButton>
              <NavButton>회원가입</NavButton>
            </>
          )}
          {userState !== 'prelogin' && (
            <>
              <NavButton>마이페이지</NavButton>
              <NavButton>로그아웃</NavButton>
            </>
          )}
          {userState === 'admin' && <AdminButton>관리자전용</AdminButton>}
        </Box>
      </NavBar>
    </>
  );
};
