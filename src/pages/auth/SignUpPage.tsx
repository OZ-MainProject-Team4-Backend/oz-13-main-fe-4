// import { css } from '../../../styled-system/css';
// import { center, container, flex, grid, hstack, stack } from '../../../styled-system/patterns';
// import Button from '../../components/Button/Button';
// import Input from '../../components/Input/Input';

// export default function SignUpPage() {
//   return (
//     <div className={center({ minH: '100vh' })}>
//       <div className={container({ maxW: '2xl' })}>
//         <div
//           className={css({
//             bg: 'white',
//             p: { base: 3, md: 8 },
//             borderRadius: 'xl',
//             boxShadow: 'lg',
//             width: '100%',
//           })}
//         >
//           <h1
//             className={css({
//               fontWeight: 'bold',
//               fontSize: { base: '2xl', md: '3xl' },
//               textAlign: 'center',
//               mb: 8,
//             })}
//           >
//             회원가입
//           </h1>

//           <form className={stack({ gap: { base: 4, md: 10 } })} action=''>
//             <div className={grid({ columns: { base: 1, md: 2 }, gap: 3 })}>
//               <Input label='이름' type='text' placeholder='이름을 입력해주세요' id='userName' />
//               <Input
//                 label='닉네임'
//                 type='text'
//                 placeholder='2~20자 입력해주세요'
//                 id='userNickName'
//               />
//             </div>
//             <div className={grid({ columns: { base: 1, md: 2 }, gap: 3 })}>
//               <Input
//                 label='전화번호'
//                 type='text'
//                 placeholder='01012345678'
//                 helperText='(-)빼고 입력해주세요'
//               />
//               <div>
//                 <label
//                   className={css({
//                     display: 'block',
//                     mb: 5,
//                     fontWeight: 'medium',
//                     color: 'gray.700',
//                   })}
//                 >
//                   성별
//                 </label>
//                 <div
//                   className={hstack({
//                     gap: 10,
//                     flex: 'content',
//                     justify: 'center',
//                   })}
//                 >
//                   <label className={hstack({ gap: 2 })}>
//                     <input type='radio' name='gender' value='male' defaultChecked /> 남자
//                   </label>
//                   <label className={hstack({ gap: 2 })}>
//                     <input type='radio' name='gender' value='female' /> 여자
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className={flex({ direction: 'column', gap: 2 })}>
//               <Input label='이메일' type='email' />
//               <Button type='button' variant='success'>
//                 이메일 인증하기
//               </Button>
//             </div>

//             <div className={grid({ columns: { base: 1, md: 2 }, gap: 3 })}>
//               <Input
//                 label='비밀번호'
//                 type='password'
//                 placeholder='숫자,영문포함 8자 이상'
//                 id='userPassword'
//                 helperText='숫자,영문 포함 하여 8자 이상 입력해주세요'
//               />
//               <Input
//                 label='비밀번호 확인'
//                 type='password'
//                 placeholder='비밀번호 확인'
//                 id='userPasswordConfirm'
//                 helperText='동일한 비밀번호를 입력해주세요'
//               />
//             </div>

//             <Button variant='beforeVerify' disabled>
//               회원가입하기
//             </Button>

//             <hr className={css({ m: 1, borderColor: 'gray.200' })} />

//             <div className={stack({ gap: 3 })}>
//               <p className={css({ textAlign: 'center', color: 'gray.600' })}>
//                 SNS 계정으로 간편가입
//               </p>
//               <div className={grid({ columns: { base: 1, md: 3 }, gap: 3 })}>
//                 <Button type='button' variant='google'>
//                   구글로 로그인
//                 </Button>
//                 <Button type='button' variant='naver'>
//                   네이버로 로그인
//                 </Button>
//                 <Button type='button' variant='kakao'>
//                   카카오로 로그인
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
