import { instance } from '../../../axios/instance';
import {
  ReqSendMessage,
  ResSendMessage,
  ResChatHistory,
  ReqChatHistoryParams,
} from '../types/chat';

export const sendMessage = async (data: ReqSendMessage): Promise<ResSendMessage> => {
  const res = await instance.post('/api/chat/messages', data);
  return res.data;
};

export const getChatHistory = async (params?: ReqChatHistoryParams): Promise<ResChatHistory> => {
  const res = await instance.get('/api/chat/messages', { params });
  return res.data;
};
