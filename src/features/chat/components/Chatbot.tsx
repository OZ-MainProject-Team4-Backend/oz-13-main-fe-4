import * as styles from './Chatbot.styles';
import { CgBot } from 'react-icons/cg';
import { IoSend, IoClose } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Message } from '../types/chat';
import { useSendMessage } from '../hooks/useChatQueries';

const KEYWORDS = ['오늘 날씨', '추천 옷차림', '이번주 날씨'];

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const sendMessage = useSendMessage();

  useEffect(() => {
    // 초기 환영 메시지
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        content:
          '안녕하세요! 날씨 기반 옷차림 추천 챗봇입니다. 궁금한 내용을 선택하거나 질문해주세요!',
      },
    ]);
  }, []);

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 아래로
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const currentMessage = trimmedMessage;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await sendMessage.mutateAsync({
        message: currentMessage,
      });

      const botMessage: Message = {
        id: response.id,
        type: 'bot',
        content: response.botResponse,
        createdAt: response.createdAt,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // 에러 발생 시 안내 메시지 표시
      const errorMessage: Message = {
        id: Date.now(),
        type: 'bot',
        content: '죄송합니다. 메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeywordClick = async (keyword: string) => {
    // 사용자가 키워드를 클릭한 것처럼 메시지 추가
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: keyword,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage.mutateAsync({
        message: keyword,
      });

      // 봇 응답을 UI에 추가
      const botMessage: Message = {
        id: response.id,
        type: 'bot',
        content: response.botResponse,
        createdAt: response.createdAt,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      const errorMessage: Message = {
        id: Date.now(),
        type: 'bot',
        content: '죄송합니다. 메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return isChatOpen ? (
    <div css={styles.chatContainer}>
      {/* 챗봇 상단 */}
      <div css={styles.header}>
        <div css={styles.headerContent}>
          <div css={styles.profileWrapper}>
            <CgBot css={styles.chatEmoji} />
          </div>
          <div css={styles.headerInfo}>
            <h2 css={styles.headerTitle}>챗봇</h2>
            <p css={styles.onlineStatus}>
              <span css={styles.onlineDot} />
              Online
            </p>
          </div>
        </div>
        <button type='button' onClick={() => setIsChatOpen(false)} css={styles.closeButton}>
          <IoClose />
        </button>
      </div>

      {/* 메시지 영역 */}
      <div css={styles.chatBody}>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'bot' ? (
              <div css={styles.messageWrapper}>
                <div css={styles.messageAvatar}>
                  <CgBot />
                </div>
                <div css={styles.messageBubble}>{msg.content}</div>
              </div>
            ) : (
              <div css={styles.messageWrapperUser}>
                <div css={styles.messageBubbleUser}>{msg.content}</div>
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* 키워드 버튼들 - 입력창 위에 고정 */}
      <div css={styles.keywordContainer}>
        {KEYWORDS.map((keyword) => (
          <button
            key={keyword}
            type='button'
            css={styles.keywordButton}
            onClick={() => handleKeywordClick(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>

      {/* 메시지 입력 영역 */}
      <div css={styles.inputContainer}>
        <form
          css={styles.inputWrapper}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type='text'
            css={styles.input}
            placeholder='메시지를 입력하세요...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' css={styles.sendButton} disabled={!message.trim()}>
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <button type='button' css={styles.toggleButton} onClick={() => setIsChatOpen(true)}>
      <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
    </button>
  );
};

export default Chatbot;
