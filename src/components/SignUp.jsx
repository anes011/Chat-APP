import '../styles/SignUp.css';
import show from '../images & logos/show-solid-24.png';
import hide from '../images & logos/hide-solid-24.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="sign-up">
            <h1>SIGN UP</h1>

            <div className="name-container">
                <p>Name:</p>
                <input type="text" className="name-input" />
            </div>

            <div className="email-container">
                <p>Email:</p>
                <input type="email" className="email-input" />
            </div>

            <div className="password-container">
                <p>Password:</p>
                <input type={showPassword ? 'text' : 'password'} className="password-input" />
                <img onClick={handleShowPassword} src={showPassword ? show : hide} alt={showPassword ? 'show password icon' : 'hide password icon'} />
            </div>

            <button className="sign-up-btn">SIGN UP</button>

            <div className="alternative-sign">
                <p>OR</p>
                <div className="line"></div>
            </div>

            <p className="log-in-link">Already a user? <Link to='/log-in-page'>LOGIN</Link></p>
        </div>
    )
}

export default SignUp;