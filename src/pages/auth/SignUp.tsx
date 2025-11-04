import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Card as MuiCard,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { GoogleButton, KakaoButton, NaverButton } from '../../components/Button/Button';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));
export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <SignUpContainer direction='column' justifyContent='space-between'>
      <Card variant='outlined'>
        <Typography
          component='h1'
          variant='h4'
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          회원가입
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor='name'>이름</FormLabel>
                <TextField
                  autoComplete='name'
                  name='name'
                  fullWidth
                  id='name'
                  placeholder='Jon Snow'
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor='nickname'>닉네임</FormLabel>
                <TextField
                  autoComplete='nickname'
                  name='nickname'
                  fullWidth
                  id='nickname'
                  placeholder='Snow'
                />
              </FormControl>
            </Grid>
          </Grid>

          <Stack
            direction='row'
            spacing={2}
            sx={{
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <FormLabel htmlFor='nickname'>성별</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='male' control={<Radio />} label='Male' />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor='phone'>전화번호</FormLabel>
              <TextField
                autoComplete='phone'
                name='phone'
                fullWidth
                id='phone'
                placeholder='01012345678'
                type='tel'
              />
            </FormControl>
          </Stack>
          <FormControl sx={{ justifyContent: 'center' }}>
            <FormLabel htmlFor='nickname'>연령대</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel value='ten' control={<Radio />} label='10대' />
              <FormControlLabel value='twenty' control={<Radio />} label='20대' />
              <FormControlLabel value='thirty' control={<Radio />} label='30대' />
              <FormControlLabel value='fourthy' control={<Radio />} label='40대' />
              <FormControlLabel value='fifth' control={<Radio />} label='50대' />
              <FormControlLabel value='sixth' control={<Radio />} label='60대' />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>이메일</FormLabel>
            <TextField
              fullWidth
              id='email'
              placeholder='your@email.com'
              name='email'
              autoComplete='email'
              variant='outlined'
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>비밀번호</FormLabel>
            <TextField
              required
              fullWidth
              name='password'
              placeholder='••••••'
              type='password'
              id='password'
              autoComplete='new-password'
              variant='outlined'
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='passwordConfirm'>비밀번호 확인</FormLabel>
            <TextField
              required
              fullWidth
              name='passwordConfirm'
              placeholder='••••••'
              type='password'
              id='passwordConfirm'
              autoComplete='new-password'
              variant='outlined'
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value='allowExtraEmails' color='primary' />}
            label='I want to receive updates via email.'
          />
          <Button type='submit' fullWidth variant='contained' onClick={validateInputs}>
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider>
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
            Already have an account?{' '}
            <Link
              href='/material-ui/getting-started/templates/sign-in/'
              variant='body2'
              sx={{ alignSelf: 'center' }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
