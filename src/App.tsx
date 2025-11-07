import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';
import Layout from './pages/Layout';
import { Mainpage } from './pages/main/MainPage';
import Mypage from './pages/Mypage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Mainpage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mypage' element={<Mypage />} />
        {/* <Route path='/diary' element={<DiaryCalendar />} /> 추후 업데이트 예정*/}
      </Route>
    </Routes>
  );
}

export default App;
