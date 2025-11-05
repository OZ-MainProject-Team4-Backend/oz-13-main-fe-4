import './App.css';
import ColorButtons from './components/Button/Button';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

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
      >
        <h1>Emotion 스타일 적용 완료 🎨</h1>
        <ColorButtons />
      </div>
      <Footer />
    </>
  );
}

export default App;
