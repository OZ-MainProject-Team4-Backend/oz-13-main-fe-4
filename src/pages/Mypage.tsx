import CancelIcon from '@mui/icons-material/Cancel';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CssBaseline,
  Divider,
  FormControl,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import BaseModal from '../components/Modal/BaseModal';
import {
  useSendEmailCodeMutation,
  useVerifyEmailCodeMutation,
} from '../features/auth/hooks/useEmailVerificationMutation';
import { useGetMeQuery } from '../features/auth/hooks/useGetMeQuery';
import {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from '../features/auth/hooks/useMypageMutation';
import { useNicknameValidateMutation } from '../features/auth/hooks/useNicknameValidateMutation';
import { FormFieldPassword, MyPageFormData } from '../features/auth/types/zodTypes';
import AppTheme from '../styles/AppTheme';
import { CardMui, ContainerMui } from '../styles/AuthStyle';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Mypage() {
  const sendEmailCode = useSendEmailCodeMutation(); //이메일 중복 확인
  const verityEmailCode = useVerifyEmailCodeMutation(); //이메일 인증 코드 확인
  const nicknameValidate = useNicknameValidateMutation(); //닉네임중복 query
  const [isNicknameValidated, setIsNicknameValidated] = useState(false); //닉네임 중복검사 확인 상태
  const [nicknameShowModal, setNickanameShowModal] = useState(false); //닉네임 모달창 상태()
  const [emailShowModal, setEmailShowModal] = useState(false); // 이메일 모달창 상태
  const [modalMessage, setModalMessage] = useState(''); //모달메시지
  // src/pages/auth/SignUp.tsx
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 중복 상태
  const [isEmailCodeChecked, setIsEmailCodeChecked] = useState(false); //이메일 인증코드 상태
  const [isEditMode, setIsEditMode] = useState(false); //수정모드 상태
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false); //비밀번호 수정모드 상태
  // Mutation hooks
  const updateProfileMutation = useUpdateProfileMutation();
  const updatePasswordMutation = useUpdatePasswordMutation();
  // Hook 호출 (자동으로 API 실행됨)
  const { data, isLoading, error } = useGetMeQuery();

  // 초기화 폼 분리(비밀번호,유저정보)
  // 기본 정보 폼
  const { reset, handleSubmit, control, watch, register } = useForm();
  const profileForm = useForm<MyPageFormData>({
    defaultValues: { name: '', nickname: '', email: '', gender: '', age: '' },
  });

  // 비밀번호 폼 (별도)
  const passwordForm = useForm<FormFieldPassword>({
    defaultValues: { oldPassword: '', newPassword: '', newPasswordConfirm: '' },
  });

  // 닉네임 중복 검사
  const handleNicknameValidate = () => {
    const nickname = watch('nickname'); // react-hook-form의  사용
    if (!nickname) {
      setModalMessage('닉네임을 입력해주세요');
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
          console.log('전체 에러:', error);
          console.log('에러 타입:', typeof error);
          setModalMessage(`${error.message}.다시 입력해주세요`);
          setNickanameShowModal(true);
          setIsNicknameValidated(false);
        },
      }
    );
  };

  //이메일 중복 검사
  const handleEmailValidate = async () => {
    const email = watch('email') as string;
    // 이메일 필드만 검증

    sendEmailCode.mutate(
      { email },
      {
        onSuccess: () => {
          setModalMessage('인증 메일이 발송되었습니다!');
          setEmailShowModal(true);
          setIsEmailVerified(true);
        },
        onError: (error) => {
          setModalMessage(`${error.message}. 새로운 이메일을 입력해주세요`);
          setEmailShowModal(true);
        },
      }
    );
  };

  //이메일 중복 코드 검사
  const handleEmailCodeValidate = async () => {
    const code = watch('emailCode');
    const email = watch('email') as string;

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

  // 초기화 후 데이터 들어오면 폼에 데이터 채우기.
  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data?.name,
        nickname: data.data?.nickname,
        email: data.data?.email,
        gender: data.data?.gender,
        age: data.data?.age,
      });
    }
  }, [data, reset]);

  //  로딩 중일 때
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  //  에러 발생 시
  if (error) {
    return <div>에러 발생</div>;
  }

  // 회원정보 수정완료 핸들러
  const handleProfileSubmit: SubmitHandler<MyPageFormData> = (data) => {
    updateProfileMutation.mutate(
      {
        nickname: data.nickname,
        email: data.email,
        gender: data.gender,
        age: data.age,
      },
      {
        onSuccess: () => {
          setModalMessage('프로필 수정 완료');
          setEmailShowModal(true);
          setIsEditMode(false);
          //쿼리 갱신
          // queryClient.invalidateQueries({ queryKey: ['me'] });
        },

        onError: (error) => {
          setModalMessage(error.message);
          setEmailShowModal(true);
        },
      }
    );
  };

  // 비밀번호 수정 완료
  const handlePasswordSubmit: SubmitHandler<FormFieldPassword> = (formData) => {
    updatePasswordMutation.mutate(
      {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
        new_password_confirm: formData.newPasswordConfirm,
      },
      {
        onSuccess: () => {
          setModalMessage('비밀번호 변경 완료');
          setEmailShowModal(true);
          setIsPasswordEditMode(false);
          passwordForm.reset();
        },
        onError: (error) => {
          setModalMessage(error.message);
          setEmailShowModal(true);
        },
      }
    );
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ContainerMui direction='column' justifyContent='space-between'>
        <CardMui>
          <Typography
            component='h1'
            variant='h4'
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              alignItems: 'center',
              py: 4,
            }}
          >
            마이페이지
          </Typography>{' '}
          <Box component='section'>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifySelf: 'flex-end',
                gap: 2,
              }}
            >
              <Button
                sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                variant='contained'
                size='small'
                color='secondary'
                type='submit'
              >
                수정하기
              </Button>
            </Stack>
          </Box>
          {/* 스택 시작  */}
          <Stack
            component='form'
            spacing={{ xs: 4, md: 8 }}
            onSubmit={handleSubmit(handleProfileSubmit)}
          >
            <Stack>
              <Divider>
                <Typography
                  variant='h6'
                  sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.15rem)' }}
                >
                  회원정보
                </Typography>
              </Divider>

              <Stack
                component='section'
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <FormGrid>
                  <FormLabel htmlFor='name'>이름</FormLabel>
                  <OutlinedInput
                    {...register('name')}
                    autoComplete='name'
                    fullWidth
                    id='name'
                    placeholder='홍길동'
                    name='name'
                    type='name'
                    size='medium'
                    disabled
                  />
                </FormGrid>
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
                <FormGrid>
                  <FormLabel htmlFor='nickname'>닉네임</FormLabel>
                  <Stack direction='row' spacing={1}>
                    <OutlinedInput
                      {...register('nickname')}
                      id='nickname'
                      placeholder='동해번쩍 서해번쩍'
                      name='nickname'
                      type='name'
                      fullWidth
                      autoComplete='name'
                      size='medium'
                    />
                    <Button
                      variant='contained'
                      color='info'
                      onClick={handleNicknameValidate}
                      disabled={isNicknameValidated}
                      type='button'
                      sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                    >
                      중복확인
                    </Button>
                  </Stack>
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                  <FormLabel>성별</FormLabel>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value='F' control={<Radio />} label='여성' />
                        <FormControlLabel value='M' control={<Radio />} label='남성' />
                      </RadioGroup>
                    )}
                  />
                </FormGrid>
                <FormGrid flex={1}>
                  <FormControl>
                    <FormLabel htmlFor='named-select'>연령대</FormLabel>
                    <Controller
                      name='age'
                      control={control}
                      render={({ field }) => (
                        <Select {...field} id='named-select'>
                          <MenuItem value={'ten'}>10대</MenuItem>
                          <MenuItem value={'twenty'}>20대</MenuItem>
                          <MenuItem value={'thirty'}>30대</MenuItem>
                          <MenuItem value={'fourthy'}>40대</MenuItem>
                          <MenuItem value={'fifth'}>50대</MenuItem>
                          <MenuItem value={'sixth'}>60대</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </FormGrid>
              </Stack>
            </Stack>
            <Stack>
              <Divider>
                <Typography
                  variant='h6'
                  sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.15rem)' }}
                >
                  이메일 변경
                </Typography>
              </Divider>

              <FormGrid>
                <FormLabel htmlFor='email'>이메일</FormLabel>
                <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
                  <OutlinedInput
                    {...register('email')}
                    fullWidth
                    id='email'
                    placeholder='your@email.com'
                    autoComplete='email'
                  />
                  <Button
                    variant='contained'
                    color='success'
                    type='button'
                    onClick={handleEmailValidate}
                    disabled={isEmailVerified}
                    sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                  >
                    인증코드 보내기
                  </Button>
                </Stack>
              </FormGrid>
            </Stack>
            {isEmailVerified ? (
              <FormControl>
                <FormLabel htmlFor='emailCode'>이메일 인증코드</FormLabel>
                <TextField
                  {...register('emailCode')}
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
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
            <BaseModal
              isOpen={emailShowModal}
              onClose={() => setEmailShowModal(false)}
              title='이메일 인증코드'
              subtitle={modalMessage}
              footer={
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    setEmailShowModal(false);
                  }}
                >
                  확인
                </Button>
              }
            />
            <Stack>
              <Divider>
                <Typography
                  variant='h6'
                  sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.15rem)' }}
                >
                  비밀번호 변경
                </Typography>
              </Divider>

              <Stack
                component='section'
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent={'space-between'}
              >
                <FormGrid flex={1}>
                  <FormLabel htmlFor='oldPassword'>현재 비밀번호</FormLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='••••••'
                    type='password'
                    id='oldPassword'
                    autoComplete='new-oldPassword'
                    name='oldPassword'
                    size='small'
                  />
                </FormGrid>
                <FormGrid flex={1}>
                  <FormLabel htmlFor='newPassword'>새 비밀번호 </FormLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='••••••'
                    type='password'
                    id='newPassword'
                    autoComplete='new-password'
                    name='state'
                    size='small'
                  />
                </FormGrid>
                <FormGrid flex={1}>
                  <FormLabel htmlFor='newPasswordConfirm'>새 비밀번호 확인</FormLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    placeholder='••••••'
                    type='password'
                    id='newPasswordConfirm'
                    autoComplete='new-password'
                  />
                </FormGrid>
              </Stack>
            </Stack>
            <Stack>
              <Divider>
                <Typography
                  variant='h6'
                  sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.15rem)' }}
                >
                  즐겨찾는 지역 수정
                </Typography>
              </Divider>
              {/* 도전 */}
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid
                  spacing={2}
                  container
                  sx={{
                    '--Grid-borderWidth': '1px',
                    borderColor: 'divider',
                    '& > div': {
                      borderColor: 'divider',
                    },
                  }}
                >
                  {[...Array(3)].map((_, index) => (
                    <Grid
                      key={index}
                      size={{
                        xs: 12,
                        md: 4,
                      }}
                    >
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                              Icon
                            </Avatar>
                          }
                          sx={{ textAlign: 'left' }}
                          action={<CancelIcon aria-label='close' />}
                          title='수원시 장안구'
                          subheader='KT위즈파크'
                        />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                          <Button
                            variant='contained'
                            color='secondary'
                            type='button'
                            size='small'
                            sx={{
                              minWidth: 'fit-content',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            수정
                          </Button>{' '}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Stack>
        </CardMui>
      </ContainerMui>
    </AppTheme>
  );
}
