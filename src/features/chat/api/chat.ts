import { instance } from '../../../axios/instance';
import { ReqSendMessage, ResSendMessage, ResChatHistory } from '../types/chat';

export const sendMessage = async (message: ReqSendMessage): Promise<ResSendMessage> => {
  const res = await instance.post('/api/chat/send', message);

  return res.data;
};

export const getChatHistory = async (): Promise<ResChatHistory> => {
  const res = await instance.get('/api/chat/session');

  const messages = Array.isArray(res.data) ? res.data : [];

  return {
    messages,
  };
};
