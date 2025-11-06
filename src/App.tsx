import { Route, Routes } from 'react-router-dom';
import './App.css';
import DiaryCalendar from './features/diary/components/DiaryCalendar';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';
import { Mainpage } from './pages/main/MainPage';
import Mypage from './pages/Mypage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/mypage' element={<Mypage />} />
      {/* <Route path='/diary' element={<DiaryCalendar />} /> 추후 업데이트 예정*/}
    </Routes>
  );
}

export default App;
