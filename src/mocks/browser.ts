import { setupWorker } from 'msw/browser';
import { authHandlers } from './handler/auth';
import { handlers } from './handler/index';
import { diaryHandlers } from './handler/diary';

export const worker = setupWorker(...handlers, ...authHandlers, ...diaryHandlers);
