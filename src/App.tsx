import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <>
      <Header />
      <div>
        <SignUp />
      </div>
      <Footer />
    </>
  );
}

export default App;
