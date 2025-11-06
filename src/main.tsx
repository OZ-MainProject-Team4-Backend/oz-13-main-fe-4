import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (import.meta.env.DEV) {
    // ⭐ enableMocking 수정
    const { worker } = await import('./mocks/browser.ts');
    return worker.start({
      onUnhandledRequest: 'warn', // ⭐ bypass → warn (디버깅용)
    });
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      retry: 1,
    },
  },
});
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
});
