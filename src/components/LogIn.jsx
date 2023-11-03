import '../styles/LogIn.css';
import show from '../images & logos/show-solid-24.png';
import hide from '../images & logos/hide-solid-24.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import chatData from '../ContextData';

function LogIn() {

    const {setLoggedUser} = useContext(chatData);

    const redirect = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [logInClicked, setLogInClicked] = useState(false);
    const [apiData, setApiData] = useState([]);

    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const logInTitle = useRef(null);

    useEffect(() => {
        if (logInClicked) {
            const handleApi = async () => {
                try {
                    const response = await fetch('http://localhost:7000/users');
                    const data = await response.json();
                    setApiData(Object.values(data));
                } catch (err) {
                    console.error(err);
                }
            }

            handleApi();
        }

    }, [logInClicked]);

    const handleLogInClicked = () => {
        setLogInClicked(true);
    };

    useEffect(() => {
        apiData.map((x) => {
            if (x.email === emailInput.current.value && x.password === passwordInput.current.value) {
                redirect('/main');
                setLoggedUser(x._id);
            }else {
                logInTitle.current.textContent = 'Failed to Log!'
            }
        });
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="log-in">
            <h1 ref={logInTitle}>LOG IN</h1>

            <div className="email-container">
                <p>Email:</p>
                <input ref={emailInput} type="email" className="email-input" />
            </div>

            <div className="password-container">
                <p>Password:</p>
                <input ref={passwordInput} type={showPassword ? 'text' : 'password'} className="password-input" />
                <img onClick={handleShowPassword} src={showPassword ? show : hide} alt={showPassword ? 'show password icon' : 'hide password icon'} />
            </div>

            <button onClick={handleLogInClicked} className="log-in-btn">LOG IN</button>

            <div className="alternative-sign">
                <p>OR</p>
                <div className="line"></div>
            </div>

            <p className="sign-up-link">Don't have an account? <Link to='/'>Create an Account</Link></p>
        </div>
    )
}

export default LogIn;