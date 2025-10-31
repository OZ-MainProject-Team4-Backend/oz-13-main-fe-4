import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 1,
      name: 'John Doe',
    });
  }),

  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      body: body,
      token: 'mock-token',
    });
  }),
];
