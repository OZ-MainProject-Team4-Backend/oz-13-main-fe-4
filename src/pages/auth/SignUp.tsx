import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Card as MuiCard,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { GoogleButton, KakaoButton, NaverButton } from '../../components/Button';
import BaseModal from '../../components/Modal/BaseModal';
import {
  useSendEmailCodeMutation,
  useVerifyEmailCodeMutation,
} from '../../features/auth/hooks/useEmailVerificationMutation';
import { useNicknameValidateMutation } from '../../features/auth/hooks/useNicknameValidateMutation';
import { useSignUpMutation } from '../../features/auth/hooks/useSignUpMutation';

//MUI스타일
export const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  // width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
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
    gender: z.enum(['', 'M', 'F'], {
      message: '성별을 선택해주세요',
    }),
    age: z.enum(['', 'ten', 'twenty', 'thirty', 'fourthy', 'fifth', 'sixth'], {
      message: '연령대를 선택해주세요',
    }),
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    emailCode: z.string().min(1, '숫자코드6자리 입력해주세요').max(6, '숫자ㅗ드 6자리 입니다.'),
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
  const [isNicknameValidated, setIsNicknameValidated] = useState(false); //닉네임 중복검사 확인 상태

  const signUpMutation = useSignUpMutation(); //회원가입 query
  const sendEmailCode = useSendEmailCodeMutation(); //이메일 중복 확인
  const verityEmailCode = useVerifyEmailCodeMutation(); //이메일 인증 코드 확인
  const nicknameValidate = useNicknameValidateMutation(); //닉네임중복 query
  const [nicknameShowModal, setNickanameShowModal] = useState(false); //닉네임 모달창 상태
  const [emailShowModal, setEmailShowModal] = useState(false); // 이메일 모달창 상태
  const [modalMessage, setModalMessage] = useState(''); //모달메시지
  // src/pages/auth/SignUp.tsx
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 중복 상태
  const [isEmailCodeChecked, setIsEmailCodeChecked] = useState(false); //이메일 인증코드 상태
  const navigator = useNavigate();

  //회원가입 버튼 클릭하면?mutation 불러서 비동기 통신해야함.
  const onSubmit: SubmitHandler<FormField> = (data) => {
    //🎃confirm비밀번호는 제외해야함 -> 구조분해 할당
    const { passwordConfirm, ...rest } = data;
    signUpMutation.mutate(rest, {
      onSuccess: () => {
        alert('회원가입 성공👋🏻');
        navigator('/');
      },
    });
  };

  const handleNicknameValidate = () => {
    const nickname = getValues('nickname'); // react-hook-form의 getValues 사용
    if (!nickname) {
      setModalMessage('닉네임을 입력하세용ㅋ');
      setNickanameShowModal(true);
      return;
    }

    nicknameValidate.mutate(
      { nickname },
      {
        onSuccess: (data) => {
          setModalMessage(data.message ?? '닉네임 확인완료');
          setNickanameShowModal(true);
          setIsNicknameValidated(true);
        },
        onError(error) {
          setModalMessage(error.message);
          setNickanameShowModal(true);
          setIsNicknameValidated(false);
        },
      }
    );
  };

  const handleEmailValidate = () => {
    const email = getValues('email');
    if (!email) {
      setModalMessage('이메일 입력하세용ㅋ');
      setEmailShowModal(true);
      return;
    }
    sendEmailCode.mutate(
      { email },
      {
        onSuccess: () => {
          setModalMessage('인증 메일이 발송되었습니다!');
          setEmailShowModal(true);
          setIsEmailVerified(true);
        },
        onError: (error) => {
          setModalMessage(error.message);
          setEmailShowModal(true);
        },
      }
    );
  };

  const handleEmailCodeValidate = () => {
    const code = getValues('emailCode');
    const email = getValues('email');
    if (!code) {
      setModalMessage('인증코드를 입력하세요');
      setEmailShowModal(true);
      return;
    }
    verityEmailCode.mutate(
      { code, email },
      {
        onSuccess: () => {
          setModalMessage('인증이 완료되었습니다');
          setEmailShowModal(true);
          setIsEmailCodeChecked(true);
        },
        onError: (error) => {
          setModalMessage(error.message);
          setEmailShowModal(true);
          setIsEmailCodeChecked(false);
        },
      }
    );
  };
  //2. react-hook-form 사용
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(signUpSchema), // ⭐ 조드의 타입 스키마 받아옴 이게 핵심!
    mode: 'onBlur', //🎃onBlur추가
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      gender: 'F', //디폴트값 선택되게끔
      age: 'thirty',
      emailCode: '',
    },
  });

  return (
    <Card variant='outlined'>
      {/* 에러 메시지 표시 */}
      {signUpMutation.error && <p>에러 발생!</p>}
      {/* 모달창 */}
      <BaseModal
        isOpen={nicknameShowModal}
        onClose={() => setNickanameShowModal(false)}
        title='닉네임 중복 확인'
        subtitle={modalMessage}
        footer={
          <Button onClick={() => setNickanameShowModal(false)} variant='contained'>
            확인
          </Button>
        }
      />
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
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <FormControl fullWidth>
          <FormLabel htmlFor='nickname'>닉네임</FormLabel>
          <Stack direction='row' spacing={1}>
            <TextField
              {...register('nickname')}
              error={!!errors.nickname}
              helperText={errors.nickname?.message}
              autoComplete='nickname'
              fullWidth
              id='nickname'
              placeholder='동해번쩍 서해번쩍'
              color={errors.nickname ? 'error' : 'primary'}
              disabled={isNicknameValidated} // 추가
            />
            <Button
              variant='contained'
              onClick={handleNicknameValidate}
              disabled={isNicknameValidated}
              type='button'
              sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
            >
              중복확인
            </Button>
          </Stack>
        </FormControl>

        <Stack
          direction='row'
          spacing={2}
          sx={{
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor='gender'>성별</FormLabel>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value='M' control={<Radio />} label='남자' />
                  <FormControlLabel value='F' control={<Radio />} label='여자' />
                </RadioGroup>
              )}
            />
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel htmlFor='age'>연령대</FormLabel>
          <Controller
            name='age'
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value='ten' control={<Radio />} label='10대' />
                <FormControlLabel value='twenty' control={<Radio />} label='20대' />
                <FormControlLabel value='thirty' control={<Radio />} label='30대' />
                <FormControlLabel value='fourthy' control={<Radio />} label='40대' />
                <FormControlLabel value='fifth' control={<Radio />} label='50대' />
                <FormControlLabel value='sixth' control={<Radio />} label='60대' />
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'>이메일</FormLabel>
          <TextField
            {...register('email')}
            disabled={isEmailVerified}
            fullWidth
            id='email'
            placeholder='your@email.com'
            autoComplete='email'
            variant='outlined'
            error={!!errors.email}
            helperText={errors.email?.message}
            color={errors.email ? 'error' : 'primary'}
          />
          <Button
            variant='contained'
            color='success'
            type='button'
            onClick={handleEmailValidate}
            disabled={isEmailVerified}
          >
            인증코드 보내기
          </Button>
        </FormControl>

        {isEmailVerified ? (
          <FormControl>
            <FormLabel htmlFor='emailCode'>이메일 인증코드</FormLabel>
            <TextField
              {...register('emailCode')}
              error={!!errors.emailCode}
              helperText={errors.emailCode?.message}
              fullWidth
              id='emailCode'
              placeholder='123456'
              variant='outlined'
              disabled={isEmailCodeChecked}
            />
            <Button
              variant='contained'
              color='success'
              type='button'
              onClick={handleEmailCodeValidate}
              disabled={isEmailCodeChecked}
            >
              인증코드 확인
            </Button>
          </FormControl>
        ) : (
          <h1>다시입력</h1>
        )}
        <BaseModal
          isOpen={emailShowModal}
          onClose={() => setEmailShowModal(false)}
          title='이메일 인증코드 확인'
          subtitle={modalMessage}
          footer={
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                setEmailShowModal(false);
              }}
            >
              확인
            </Button>
          }
        />

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
          type='submit'
          fullWidth
          variant='contained'
          disabled={!isEmailVerified} // 이메일 인증 완료 시에만 활성화
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
          <Link href='/login' variant='body2' sx={{ alignSelf: 'center' }}>
            로그인
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
