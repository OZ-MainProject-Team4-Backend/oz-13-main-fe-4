import { http, HttpResponse } from 'msw';
import { mockDiaries } from '../data/mockDiaries';

export const diaryHandlers = [
  // 일기 제목 조회
  http.get('/api/diary/', ({ request }) => {
    const token = request.headers.get('Authorization');

    if (!token) {
      return HttpResponse.json({ error: '토큰 필요' }, { status: 401 });
    }

    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    if (!year || !month) {
      return HttpResponse.json({ error: 'year와 month는 필수입니다' }, { status: 400 });
    }

    const paddedMonth = month.padStart(2, '0');
    const diaries = mockDiaries
      .filter((d) => d.date.startsWith(`${year}-${paddedMonth}`))
      .map(({ id, date, title }) => ({ id, date, title }));

    return HttpResponse.json(diaries, { status: 200 });
  }),

  // 일기 상세 조회
  http.get('/api/diary/:id', ({ params, request }) => {
    const token = request.headers.get('Authorization');

    if (!token) {
      return HttpResponse.json({ error: '토큰 필요' }, { status: 401 });
    }

    const { id } = params;
    const diary = mockDiaries.find((d) => d.id === Number(id));

    if (!diary) {
      return HttpResponse.json({ error: '존재하지 않습니다' }, { status: 404 });
    }

    return HttpResponse.json(diary, { status: 200 });
  }),

  // 일기 작성
  http.post('/api/diary', async ({ request }) => {
    const token = request.headers.get('Authorization');

    if (!token) {
      return HttpResponse.json({ error: '토큰 필요' }, { status: 401 });
    }

    try {
      const formData = await request.formData();

      const date = formData.get('date') as string;
      const title = formData.get('title') as string;
      const emotion = Number(formData.get('emotion'));
      const notes = formData.get('notes') as string;
      const image_url = formData.get('image_url') as string;

      if (!date || !title || !notes) {
        return HttpResponse.json({ error: '작성 실패' }, { status: 400 });
      }

      // Mock 날씨 데이터 (실제로는 lat, lon으로 날씨 API 호출)
      const weather = {
        condition: 'Cloudy',
        temperature: 18,
        icon: 1,
      };

      const newDiary = {
        id: mockDiaries.length + 1,
        date,
        title,
        emotion,
        notes,
        image_url,
        weather,
      };

      mockDiaries.push(newDiary);

      return HttpResponse.json(
        { diary_id: newDiary.id, message: '일기 작성 완료' },
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json({ error: '작성 실패' }, { status: 400 });
    }
  }),

  // 일기 수정
  http.patch('/api/diary/:id', async ({ params, request }) => {
    const token = request.headers.get('Authorization');

    if (!token) {
      return HttpResponse.json({ error: '토큰 필요' }, { status: 401 });
    }

    const { id } = params;
    const diaryIndex = mockDiaries.findIndex((d) => d.id === Number(id));

    if (diaryIndex === -1) {
      return HttpResponse.json({ error: '수정 실패' }, { status: 400 });
    }

    try {
      const formData = await request.formData();

      const title = formData.get('title') as string | null;
      const notes = formData.get('notes') as string | null;
      const emotion = formData.get('emotion');
      const image_url = formData.get('image_url') as string | null;

      // 기존 값에 새 값 덮어쓰기
      const updatedDiary = {
        ...mockDiaries[diaryIndex],
        ...(title && { title }),
        ...(emotion !== null && emotion !== undefined && { emotion: Number(emotion) }),
        ...(notes && { notes }),
        ...(image_url && { image_url }),
      };

      mockDiaries[diaryIndex] = updatedDiary;

      return HttpResponse.json(updatedDiary, { status: 200 });
    } catch (error) {
      return HttpResponse.json({ error: '수정 실패' }, { status: 400 });
    }
  }),

  // 일기 삭제
  http.delete('/api/diary/:id', ({ params, request }) => {
    const token = request.headers.get('Authorization');

    if (!token) {
      return HttpResponse.json({ error: '토큰 필요' }, { status: 401 });
    }

    const { id } = params;
    const diaryIndex = mockDiaries.findIndex((d) => d.id === Number(id));

    if (diaryIndex === -1) {
      return HttpResponse.json({ error: '삭제 실패' }, { status: 400 });
    }

    // Soft Delete 구현
    mockDiaries.splice(diaryIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
