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
    queryKey: ['diary', year, month],
    queryFn: () => getDiariesForCalendar(year, month),
    enabled: year !== undefined && month !== undefined,
  });
  console.log('fetching diaries for:', year, month);
  return { data, isLoading, error };
};

// 일기 상세 조회
export const useDiaryDetail = (id?: number) => {
  return useQuery<DiaryData, Error>({
    queryKey: ['diary', id],
    queryFn: () => getDiaryForDetail(id!),
    enabled: id !== undefined,
  });
};

// 일기 수정
export const useEditDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, diary, image }: { id: number; diary: DiaryData; image: File | null }) =>
      patchDiaryApi(diary, id, image),
    onSuccess: (updatedDiary: DiaryData) => {
      queryClient.invalidateQueries({ queryKey: ['diary', updatedDiary.id] });
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
    onError: (error: Error) => {
      console.log('일기 수정 실패 : ', error.message);
    },
  });
};
