import { instance } from '../../../axios/instance';
import { ReqSendMessage, ResSendMessage } from '../types/chat';

export const sendMessage = async (message: ReqSendMessage): Promise<ResSendMessage> => {
  const res = await instance.post('/chat/send/', message);

  return res.data;
};

// export const getChatHistory = async (): Promise<ResChatHistory> => {
//   const res = await instance.get('/chat/session');

//   const messages = res.data?.messages && Array.isArray(res.data.messages) ? res.data.messages : [];

//   return {
//     session_id: res.data?.session_id || '',
//     created_at: res.data?.created_at || '',
//     messages,
//     next_before_id: res.data?.next_before_id ?? null,
//     has_more: res.data?.has_more || false,
//   };
// };
