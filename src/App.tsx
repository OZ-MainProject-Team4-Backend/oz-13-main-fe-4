import { Route, Routes } from 'react-router-dom';
import './App.css';
import Diary from './pages/diary/diary';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import { MainPage } from './pages/main/MainPage';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/diary' element={<Diary />} />
      </Route>
    </Routes>
  );
}

export default App;
