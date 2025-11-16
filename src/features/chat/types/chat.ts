export interface Message {
  id: number;
  role: 'ai' | 'user';
  text: string;
  createdAt?: string; // ISO 8601 형식
}

export interface ReqSendMessage {
  message: string;
}

export interface ResSendMessage {
  answer: string;
  session_id: string;
  model: string;
  created_at: string;
}

export interface ResChatHistory {
  messages: Message[];
}
