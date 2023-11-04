import './styles/universal.css';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import chatData from './ContextData';

function App() {

  const [sideBar, setSideBar] = useState(true);
  const [userClicked, setUserClicked] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [person, setPerson] = useState(null);

  return (
    <chatData.Provider value={{ sideBar, setSideBar, userClicked, setUserClicked, loggedUser, setLoggedUser, person, setPerson }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<SignUpPage />} />
            <Route path='/log-in-page' element={<LogInPage />} />
            <Route path='/main' element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    </chatData.Provider>
  );
}

export default App;
