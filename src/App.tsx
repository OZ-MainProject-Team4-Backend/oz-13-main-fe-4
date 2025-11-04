import { css } from '@emotion/react';
import './App.css';

function App() {
  return (
    <div
      css={css`
        background-color: #dbeafe;
        min-height: 100vh;
        display: flex;
        direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        font-family: 'Pretendard', sans-serif;
      `}
    />
  );
}

export default App;
