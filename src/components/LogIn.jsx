import '../styles/LogIn.css';
import show from '../images & logos/show-solid-24.png';
import hide from '../images & logos/hide-solid-24.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function LogIn() {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="log-in">
            <h1>LOG IN</h1>

            <div className="email-container">
                <p>Email:</p>
                <input type="email" className="email-input" />
            </div>

            <div className="password-container">
                <p>Password:</p>
                <input type={showPassword ? 'text' : 'password'} className="password-input" />
                <img onClick={handleShowPassword} src={showPassword ? show : hide} alt={showPassword ? 'show password icon' : 'hide password icon'} />
            </div>

            <button className="log-in-btn">LOG IN</button>

            <div className="alternative-sign">
                <p>OR</p>
                <div className="line"></div>
            </div>

            <p className="sign-up-link">Don't have an account? <Link to='/'>Create an Account</Link></p>
        </div>
    )
}

export default LogIn;