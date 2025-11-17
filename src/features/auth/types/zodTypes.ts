//1. ZOD스키마 정의

import z from 'zod';

//- 회원가입 스키마
export const signUpSchema = z
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
    emailCode: z.string().min(6, '숫자코드6자리 입력해주세요').max(6, '숫자코드 6자리 입니다.'),
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

export type FormField = z.infer<typeof signUpSchema>;

//- 로그인 스키마
export type FormFieldLogin = z.infer<typeof logInSchema>;

export const logInSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(6, '비밀번호는 6자 이상 입력해주세요')
    .max(20, '비밀번호는 20자 이하로 입력해주세요')
    .regex(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/, '영문 소문자와 숫자 조합으로 입력해주세요'),
});

//- 마이페이지 스키마
export const mypageSchema = z.object({
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
  emailCode: z.string().min(6, '숫자코드6자리 입력해주세요').max(6, '숫자코드 6자리 입니다.'),
});

export type FormFieldMypage = z.infer<typeof mypageSchema>;

//- 비밀번호 스키마
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, '현재 비밀번호를 입력하세요'),
    newPassword: z
      .string()
      .min(6, '6자 이상')
      .regex(/^(?=.*[a-z])(?=.*[0-9])/, '영문+숫자 조합'),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: '새 비밀번호가 일치하지 않습니다',
    path: ['newPasswordConfirm'],
  });

export type FormFieldPassword = z.infer<typeof passwordSchema>;

export type MyPageFormData = Partial<FormFieldMypage>;
