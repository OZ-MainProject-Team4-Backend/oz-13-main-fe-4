import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import LogIn from './pages/auth/LogIn';

function App() {
  return (
    <>
      <Header />
      <LogIn />
      <Footer />
    </>
  );
}

export default App;
