import { setupWorker } from 'msw/browser';
import { handlers } from './handler/index';

export const worker = setupWorker(...handlers);
