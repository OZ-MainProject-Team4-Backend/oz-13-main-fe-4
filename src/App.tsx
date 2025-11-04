import './App.css';
import { css } from '@emotion/react';

function App() {
  return (
    <div
      css={css`
        background-color: #dbeafe;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Pretendard', sans-serif;
      `}
    >
      <h1>Emotion 스타일 적용 완료 🎨</h1>
    </div>
  );
}

export default App;
