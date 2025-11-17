import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReqSendMessage, ResSendMessage } from '../types/chat';
import { sendMessage } from '../api/chat';

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

// // 서버에서 대화 내역 받아오기 (실시간 세션)
// export const useChatHistory = () => {
//   return useQuery<ResChatHistory, Error>({
//     queryKey: ['chatHistory'],
//     queryFn: getChatHistory,
//   });
// };
