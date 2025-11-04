import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Card as MuiCard,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { GoogleButton, KakaoButton, NaverButton } from '../../components/Button/Button';
import ForgotPassword from '../../components/Modal/ForgotPassword';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '640px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '400px',
    padding: theme.spacing(3),
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('올바른 이메일 형식 입력해주세요');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 최소8자 이상입니다');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant='outlined'>
      <Typography
        component='h1'
        variant='h4'
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 5 }}
      >
        로그인
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor='email' sx={{ textAlign: 'left', mb: 3 }}>
            이메일(아이디)
          </FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id='email'
            type='email'
            name='email'
            placeholder='your@email.com'
            autoComplete='email'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password' sx={{ textAlign: 'left', mb: 3 }}>
            비밀번호
          </FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name='password'
            placeholder='••••••'
            type='password'
            id='password'
            autoComplete='current-password'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='로그인 정보 저장'
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type='submit' fullWidth variant='contained' onClick={validateInputs}>
          로그인
        </Button>
        <Link
          component='button'
          type='button'
          onClick={handleClickOpen}
          variant='body2'
          sx={{ alignSelf: 'center' }}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </Box>
      <Divider sx={{ my: 3 }}>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <GoogleButton fullWidth onClick={() => alert('Sign in with Google')}>
          구글 로그인
        </GoogleButton>
        <KakaoButton fullWidth onClick={() => alert('Sign in with 카카오')}>
          카카오 로그인
        </KakaoButton>
        <NaverButton fullWidth onClick={() => alert('Sign in with 네이버')}>
          네이버 로그인
        </NaverButton>
        <Typography sx={{ textAlign: 'center' }}>
          계정이 없으신가요?{' '}
          <Link
            href='/material-ui/getting-started/templates/sign-in/'
            variant='body2'
            sx={{ alignSelf: 'center' }}
          >
            회원가입
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
