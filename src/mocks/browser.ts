import { setupWorker } from 'msw/browser';
import { authHandlers } from './handler/auth';
import { handlers } from './handler/index';

export const worker = setupWorker(...handlers, ...authHandlers);
