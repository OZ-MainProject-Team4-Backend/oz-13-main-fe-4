import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postDiaryApi } from '../api/diary';
import { DiaryData } from '../types/types';

// 일기 생성
export const useCreateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ diary, image }: { diary: DiaryData; image: File | null }) =>
      postDiaryApi(diary, image),
    onSuccess: (data) => {
      console.log('일기 작성 성공 : ', data);
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    },
    onError: (error: Error) => {
      console.log('일기 작성 실패 : ', error.message);
      alert(error.message);
    },
  });
};

// 캘린더용 일기 조회
// export const useDiariesForCalendar = (year: number, month: number) => {
//   return useQuery({
//     queryKey: ['calendarDiary', year, month],
//     queryFn: () => getDiariesForCalendar(year, month),
//   });
// };
