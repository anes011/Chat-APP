import './styles/universal.css';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignUpPage />} />
          <Route path='/log-in-page' element={<LogInPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
