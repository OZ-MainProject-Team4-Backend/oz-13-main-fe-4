import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LogIn from './pages/auth/LogIn';
import SignUp from './pages/auth/SignUp';
import { Mainpage } from './pages/main/MainPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Mainpage />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;
