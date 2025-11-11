import { DiaryData } from '../types/types';

export const postDiaryApi = async (diary: DiaryData, image: File | null) => {
  const formData = new FormData();

  formData.append('date', diary.date);
  formData.append('title', diary.title);
  formData.append('emotion', diary.emotion);
  formData.append('notes', diary.notes);

  if (image) {
    formData.append('image', image);
  }

  const res = await fetch('/api/diary', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_MOCK_TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || '일기 작성 실패');
  }
  return res.json();
};
