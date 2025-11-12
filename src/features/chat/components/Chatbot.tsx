import * as styles from './Chatbot.styles';
import { CgBot } from 'react-icons/cg';

const Chatbot = () => {
  return (
    <div css={styles.ChatContainer}>
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
    </div>
  );
};

export default Chatbot;
