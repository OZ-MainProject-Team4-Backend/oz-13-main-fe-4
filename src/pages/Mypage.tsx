import { zodResolver } from '@hookform/resolvers/zod';
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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormFieldMypage, mypageSchema } from '../features/auth/types/zodTypes';
import AppTheme from '../styles/AppTheme';
import { CardMui, ContainerMui } from '../styles/AuthStyle';
import { useAuthStore } from '../features/auth/store/authStore';
import Chatbot from '../features/chat/components/Chatbot';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Mypage() {
  // const { user } = useAuthStore().user;
  // console.log(user);
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormFieldMypage>({
    resolver: zodResolver(mypageSchema), // ⭐ 조드의 타입 스키마 받아옴 이게 핵심!
    mode: 'onBlur', //🎃onBlur추가
    defaultValues: {
      name: 'ㅇㅇ',
      nickname: '',
      email: '',
      newPassword: '',
      gender: 'F', //디폴트값 선택되게끔
      age: 'thirty',
      emailCode: '',
    },
  });
  const onSubmit: SubmitHandler<FormFieldMypage> = (data) => {
    console.log(data);
  };
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
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
              >
                수정하기
              </Button>
              <Button
                sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                variant='contained'
                size='small'
                color='success'
              >
                완료
              </Button>
            </Stack>
          </Box>
          {/* 스택 시작  */}
          <Stack component='form' onSubmit={handleSubmit(onSubmit)} spacing={{ xs: 4, md: 8 }}>
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
                    error={!!errors.name}
                    autoComplete='name'
                    fullWidth
                    id='name'
                    placeholder='홍길동'
                    color={errors.name ? 'error' : 'primary'}
                    name='name'
                    type='name'
                    size='medium'
                  />
                </FormGrid>
                <FormGrid>
                  <FormLabel htmlFor='nickname'>닉네임</FormLabel>
                  <Stack direction='row' spacing={1}>
                    <OutlinedInput
                      {...register('nickname')}
                      error={!!errors.nickname}
                      id='nickname'
                      placeholder='동해번쩍 서해번쩍'
                      color={errors.nickname ? 'error' : 'primary'}
                      name='nickname'
                      type='name'
                      fullWidth
                      autoComplete='name'
                      size='medium'
                    />
                    <Button
                      variant='contained'
                      color='info'
                      type='button'
                      sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                    >
                      중복확인
                    </Button>
                  </Stack>
                </FormGrid>
                <FormGrid>
                  <FormControl>
                    <FormLabel id='demo-row-radio-buttons-group-label'>성별</FormLabel>
                    <RadioGroup
                      row
                      sx={{ justifyContent: 'space-around' }}
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                    >
                      <FormControlLabel value='F' control={<Radio />} label='여자' />
                      <FormControlLabel value='M' control={<Radio />} label='남자' />
                    </RadioGroup>
                  </FormControl>
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
                    error={!!errors.email}
                    color={errors.email ? 'error' : 'primary'}
                  />
                  <Button
                    variant='contained'
                    color='success'
                    type='button'
                    sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                  >
                    인증코드 보내기
                  </Button>
                </Stack>
              </FormGrid>
            </Stack>
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
                  <FormLabel htmlFor='oldPassword'>비밀번호</FormLabel>
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
                  <FormLabel htmlFor='newPassword'>비밀번호 확인</FormLabel>
                  <OutlinedInput
                    {...register('newPassword')} // 이게 name, onChange 등을 자동으로 추가
                    error={!!errors.newPassword}
                    required
                    fullWidth
                    placeholder='••••••'
                    type='password'
                    id='newPassword'
                    autoComplete='new-password'
                    color={errors.newPassword ? 'error' : 'primary'}
                    name='state'
                    size='small'
                  />
                </FormGrid>
                <FormGrid flex={1}>
                  <FormLabel htmlFor='newPasswordConfirm'>새 비밀번호 확인</FormLabel>
                  <OutlinedInput
                    {...register('newPasswordConfirm')} // 이게 name, onChange 등을 자동으로 추가
                    error={!!errors.newPasswordConfirm}
                    required
                    fullWidth
                    placeholder='••••••'
                    type='password'
                    id='newPasswordConfirm'
                    autoComplete='new-password'
                    color={errors.newPasswordConfirm ? 'error' : 'primary'}
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
      {user && <Chatbot />}
    </AppTheme>
  );
}
