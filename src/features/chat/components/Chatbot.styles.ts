import { css } from '@emotion/react';

export const ChatContainer = () => css`
  position: fixed;
  bottom: 8%;
  right: 3%;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background: rgb(248, 247, 247);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 20;
`;

export const header = css`
  background: #2c4a8f;
  color: white;
  padding: 15px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.29);
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const profileWrapper = css`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const chatEmoji = css`
  color: #2c4a8f;
  width: 35px;
  height: 35px;
`;

export const headerInfo = css`
  display: flex;
  flex-direction: column;
`;

export const headerTitle = css`
  font-size: 22px;
  margin: 0;
  padding: 2px;
`;

export const onlineStatus = css`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.75rem;
  margin: 0;
`;

export const onlineDot = css`
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
`;
