import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { GoogleButton, KakaoButton, NaverButton } from '../../components/Button';

//MUI스타일
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  borderRadius: 15,
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

//1. ZOD스키마 정의
const signUpSchema = z
  .object({
    name: z.string().min(1, '이름 입력은 필수입니다.'),
    nickname: z
      .string()
      .min(1, '닉네임 입력 필수입니다.')
      .max(10, '닉네임은10자 이내로 작성해주세요'),
    phone: z.string().regex(/^[0-9]{10,11}$/, '하이픈 없이 10-11자리 숫자만 입력해주세요'),
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    password: z
      .string()
      .min(6, '비밀번호는 6자 이상 입력해주세요')
      .max(20, '비밀번호는 20자 이하로 입력해주세요')
      .regex(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/, '영문 소문자와 숫자 조합으로 입력해주세요'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'], // 👈 에러를 어느 필드에 표시 할지 지정
  });

//1-1. 타입정의 (조드로 유추하기 )
type FormField = z.infer<typeof signUpSchema>;

export default function SignUp() {
  //폼제출 함수
  const onSubmit: SubmitHandler<FormField> = (data) => console.log(data);

  //2. react-hook-form 사용
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(signUpSchema), // ⭐ 이게 핵심!
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

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
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          onSubmit={() => {}}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor='name'>이름</FormLabel>
                <TextField
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoComplete='name'
                  fullWidth
                  id='name'
                  placeholder='홍길동'
                  color={errors.name ? 'error' : 'primary'}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor='nickname'>닉네임</FormLabel>
                <TextField
                  {...register('nickname')}
                  error={!!errors.nickname}
                  helperText={errors.nickname?.message}
                  autoComplete='nickname'
                  fullWidth
                  id='nickname'
                  placeholder='동해번쩍 서해번쩍'
                  color={errors.nickname ? 'error' : 'primary'}
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
                <FormControlLabel value='male' control={<Radio checked />} label='남자' />
                <FormControlLabel value='female' control={<Radio />} label='여자' />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor='phone'>전화번호</FormLabel>
              <TextField
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                autoComplete='phone'
                name='phone'
                fullWidth
                id='phone'
                placeholder='01012345678'
                type='tel'
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormLabel htmlFor='nickname'>연령대</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel value='ten' control={<Radio />} label='10대' />
              <FormControlLabel value='twenty' control={<Radio checked />} label='20대' />
              <FormControlLabel value='thirty' control={<Radio />} label='30대' />
              <FormControlLabel value='fourthy' control={<Radio />} label='40대' />
              <FormControlLabel value='fifth' control={<Radio />} label='50대' />
              <FormControlLabel value='sixth' control={<Radio />} label='60대' />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>이메일</FormLabel>
            <TextField
              {...register('email')}
              fullWidth
              id='email'
              placeholder='your@email.com'
              autoComplete='email'
              variant='outlined'
              error={!!errors.email}
              helperText={errors.email?.message}
              color={errors.email ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>비밀번호</FormLabel>
            <TextField
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              required
              fullWidth
              placeholder='••••••'
              type='password'
              id='password'
              autoComplete='new-password'
              variant='outlined'
              color={errors.password ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='passwordConfirm'>비밀번호 확인</FormLabel>
            <TextField
              {...register('passwordConfirm')} // 이게 name, onChange 등을 자동으로 추가
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
              required
              fullWidth
              placeholder='••••••'
              type='password'
              id='passwordConfirm'
              autoComplete='new-password'
              variant='outlined'
              color={errors.passwordConfirm ? 'error' : 'primary'}
            />
          </FormControl>

          <Button
            size='large'
            type='button'
            fullWidth
            variant='contained'
            onClick={handleSubmit(onSubmit)}
          >
            회원가입
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
            이미 계정이 있으신가요?{' '}
            <Link
              href='/material-ui/getting-started/templates/sign-in/'
              variant='body2'
              sx={{ alignSelf: 'center' }}
            >
              로그인
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
