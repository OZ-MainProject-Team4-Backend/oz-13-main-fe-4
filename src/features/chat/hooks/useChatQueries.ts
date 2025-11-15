import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ReqChatHistoryParams,
  ReqSendMessage,
  ResChatHistory,
  ResSendMessage,
} from '../types/chat';
import { getChatHistory, sendMessage } from '../api/chat';

// 메시지를 서버로 보내기
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<ResSendMessage, Error, ReqSendMessage>({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
    onError: (error) => {
      console.log('대화 전송 실패 : ', error.message);
    },
  });
};

// 서버에서 대화 내역 받아오기
export const useChatHistory = (params?: ReqChatHistoryParams) => {
  return useQuery<ResChatHistory, Error>({
    queryKey: ['chatHistory', params],
    queryFn: () => getChatHistory(params),
  });
};
