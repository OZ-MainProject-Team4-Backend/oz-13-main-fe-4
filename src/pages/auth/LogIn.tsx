import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { GoogleButton, KakaoButton, NaverButton } from '../../components/Button';
import { logIn } from '../../features/auth/api/auth';

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

//1. ZOD스키마 정의
const logInSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(6, '비밀번호는 6자 이상 입력해주세요')
    .max(20, '비밀번호는 20자 이하로 입력해주세요')
    .regex(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/, '영문 소문자와 숫자 조합으로 입력해주세요'),
});

//1-1. 타입정의 (조드로 유추하기 )
type FormField = z.infer<typeof logInSchema>;

export default function LogIn() {
  const [error, setError] = useState<string | null>(null);
  //2. react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(logInSchema), // ⭐ 조드의 타입 스키마 받아옴 이게 핵심!
    mode: 'onBlur', //🎃onBlur추가
    defaultValues: {
      email: '',
      password: '',
    },
  });
  //폼제출 함수
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    //🎃confirm비밀번호는 제외해야함 -> 구조분해 할당
    try {
      setError(null);
      const result = await logIn(data);
      console.log('로그인 성공', result);
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    }
  };
  return (
    <Card variant='outlined'>
      {/* MSW 통신 에러 메시지 표시 */}
      {error && <Typography color='error'>{error}</Typography>}
      <Typography
        component='h1'
        variant='h4'
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 5 }}
      >
        로그인
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
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
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            color={errors.email ? 'error' : 'primary'}
            id='email'
            type='email'
            name='email'
            placeholder='your@email.com'
            autoComplete='email'
            autoFocus
            required
            fullWidth
            variant='outlined'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password' sx={{ textAlign: 'left', mb: 3 }}>
            비밀번호
          </FormLabel>
          <TextField
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            name='password'
            placeholder='••••••'
            type='password'
            id='password'
            autoComplete='current-password'
            autoFocus
            required
            fullWidth
            variant='outlined'
            color={errors.password ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='로그인 정보 저장'
        />
        <Button
          disabled={isSubmitting}
          type='submit' // ⭐ 'button' → 'submit'
          fullWidth
          variant='contained'
        >
          로그인
        </Button>
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
