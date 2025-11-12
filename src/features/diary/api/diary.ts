import { DiaryData } from '../types/types';

// const baseUrl = import.meta.env.VITE_API_BASE_URL;
const accessToken = 'test-token';

export const postDiaryApi = async (diary: DiaryData, image: File | null) => {
  const formData = new FormData();

  formData.append('date', diary.date);
  formData.append('title', diary.title);
  formData.append('emotion', diary.emotion);
  formData.append('notes', diary.notes);

  if (image) {
    formData.append('image_url', image);
  }

  const res = await fetch(`http://localhost:5173/api/diary`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '일기 작성 실패');
  }
  return res.json();
};

export const getDiariesForCalendar = async (year: number, month: number): Promise<DiaryData[]> => {
  console.log('getDiariesForCalendar 실행됨', year, month);

  const res = await fetch(`http://localhost:5173/api/diary?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '일기 목록 조회 실패');
  }

  const data = await res.json();
  console.log('서버 응답 데이터 : ', data);
  return data;
};

export const getDiaryForDetail = async (id: number) => {
  const res = await fetch(`/api/diary/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '일기 목록 조회 실패');
  }

  return res.json();
};

export const patchDiaryApi = async (diary: DiaryData, id: number, image: File | null) => {
  const formData = new FormData();
  formData.append('title', diary.title);
  formData.append('notes', diary.notes);
  formData.append('emotion', diary.emotion);

  if (image) {
    formData.append('image_url', image);
  }

  const res = await fetch(`/api/diary/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!res.ok) throw new Error('수정 실패');

  return res.json();
};
