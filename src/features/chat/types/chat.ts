export interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  createdAt?: string; // ISO 8601 형식
}

export interface ReqSendMessage {
  message: string;
}

export interface ResSendMessage {
  id: number;
  userMessage: string;
  botResponse: string;
  createdAt: string;
}

export interface ResChatHistory {
  messages: Message[];
  hasMore: boolean;
  nextCursor?: number;
}

export interface ReqChatHistoryParams {
  cursor?: number;
  limit?: number;
}
