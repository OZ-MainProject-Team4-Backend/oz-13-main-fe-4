import { setupWorker } from 'msw/browser';
import { authHandlers } from './handler/auth';
import { handlers } from './handler/index';
import { outfitHandlers } from './handler/clothingHandler';

export const worker = setupWorker(...handlers, ...authHandlers, ...outfitHandlers);
