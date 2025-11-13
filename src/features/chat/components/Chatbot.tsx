import * as styles from './Chatbot.styles';
import { CgBot } from 'react-icons/cg';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('메시지 전송:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
      </div>

      {/* 메시지 영역 */}
      <div css={styles.chatBody}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            {/* 봇 메시지 */}
            <div css={styles.messageWrapper}>
              <div css={styles.messageAvatar}>
                <CgBot />
              </div>
              <div css={styles.messageBubble}>안녕하세요 무엇을 도와드릴까요? </div>
            </div>

            {/* 유저 메시지 */}
            <div css={styles.messageWrapperUser}>
              <div css={styles.messageBubbleUser}>오늘 날씨 말해줘</div>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 영역 */}
      <div css={styles.inputContainer}>
        <div css={styles.inputWrapper}>
          <input
            type='text'
            css={styles.input}
            placeholder='메시지를 입력하세요...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type='button'
            css={styles.sendButton}
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
