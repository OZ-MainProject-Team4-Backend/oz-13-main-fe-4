import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDiariesForCalendar,
  getDiaryForDetail,
  patchDiaryApi,
  postDiaryApi,
} from '../api/diary';
import { DiaryData } from '../types/types';

// 일기 생성
export const useCreateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ diary, image }: { diary: DiaryData; image: File | null }) =>
      postDiaryApi(diary, image),
    onSuccess: (data) => {
      console.log('일기 작성 성공 : ', data);
      queryClient.invalidateQueries({ queryKey: ['diary'], exact: false });
    },
    onError: (error: Error) => {
      console.log('일기 작성 실패 : ', error.message);
    },
  });
};

// 캘린더용 일기 조회
export const useDiariesForCalendar = (year: number, month: number) => {
  const { data, isLoading, error } = useQuery<DiaryData[], Error>({
    queryKey: ['diary', 'calendar', year, month],
    queryFn: () => getDiariesForCalendar(year, month),
    enabled: year !== undefined && month !== undefined,
  });
  console.log('fetching diaries for:', year, month);
  return { data, isLoading, error };
};

// 일기 상세 조회
export const useDiaryDetail = (id?: number) => {
  return useQuery<DiaryData, Error>({
    queryKey: ['diary', 'detail', id],
    queryFn: () => getDiaryForDetail(id!),
    enabled: id !== undefined,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

// 일기 수정
export const useEditDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, diary, image }: { id: number; diary: DiaryData; image: File | null }) =>
      patchDiaryApi(diary, id, image),
    onSuccess: (updatedDiary: DiaryData) => {
      console.log('일기 수정 성공 : ', updatedDiary);

      // calendar 데이터를 optimistic update
      queryClient.setQueriesData<DiaryData[]>({ queryKey: ['diary', 'calendar'] }, (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((diary) => (diary.id === updatedDiary.id ? updatedDiary : diary));
      });

      // detail은 서버에서 정확한 데이터 다시 조회
      queryClient.invalidateQueries({ queryKey: ['diary', 'detail', updatedDiary.id] });
    },
    onError: (error: Error) => {
      console.log('일기 수정 실패 : ', error.message);
    },
  });
};
