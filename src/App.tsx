import { css } from '@emotion/react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
