import { instance } from '../../../axios/instance';
import {
  ReqSendMessage,
  ResSendMessage,
  ResChatHistory,
  ReqChatHistoryParams,
} from '../types/chat';

export const sendMessage = async (message: ReqSendMessage): Promise<ResSendMessage> => {
  const res = await instance.post('/api/chat/messages', message);
  return res.data;
};

export const getChatHistory = async (params?: ReqChatHistoryParams): Promise<ResChatHistory> => {
  const res = await instance.get('/api/chat/messages', { params });
  return res.data;
};
