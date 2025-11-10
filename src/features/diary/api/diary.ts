import { DiaryData } from '../types/types';

export const getDiariesForCalendar = async (year: number, month: number) => {
  const res = await fetch(`/api/diary?year=${year}&month=${month}`);
  return res.json();
};

export const getDiariesForDetail = async () => {
  const res = await fetch('/api/diary');
  return res.json();
};

export const postDiaryApi = async (diary: DiaryData) => {
  const res = await fetch('/api/diary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diary),
  });
  if (!res.ok) throw new Error(' 실패');
  return res.json();
};

export const patchDiaryApi = async (diary: DiaryData, id: number) => {
  const res = await fetch(`/api/diary/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diary),
  });
  if (!res.ok) throw new Error('수정 실패');
};

export const deleteDiaryApi = async (id: number) => {
  await fetch(`/api/diary/${id}`, {
    method: 'DELETE',
  });
};
