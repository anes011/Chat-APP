import '../styles/SignUp.css';
import show from '../images & logos/show-solid-24.png';
import hide from '../images & logos/hide-solid-24.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function SignUp() {

    const redirect = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);

    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    useEffect(() => {
        const handleApi = async () => {
            try {
                const response = await fetch('http://localhost:7000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.current.value,
                        email: emailInput.current.value,
                        password: passwordInput.current.value
                    })
                });
                const data = await response.json();
            } catch (err) {
                console.error(err);
            }
        }


        if (signUpClicked) {
            handleApi();
        } else {
            handleApi();
        }
    }, [signUpClicked]);

    const handleSignUpClick = () => {
        setSignUpClicked(!signUpClicked);

        if (nameInput.current.value !== '' && emailInput.current.value !== '' && nameInput.current.value !== '') {
            setTimeout(() => {
                redirect('/log-in-page');
            }, 1000);
        }else {
            alert('Sign Up Failed!');
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="sign-up">
            <h1>SIGN UP</h1>

            <div className="name-container">
                <p>Name:</p>
                <input ref={nameInput} type="text" className="name-input" />
            </div>

            <div className="email-container">
                <p>Email:</p>
                <input ref={emailInput} type="email" className="email-input" />
            </div>

            <div className="password-container">
                <p>Password:</p>
                <input ref={passwordInput} type={showPassword ? 'text' : 'password'} className="password-input" />
                <img onClick={handleShowPassword} src={showPassword ? show : hide} alt={showPassword ? 'show password icon' : 'hide password icon'} />
            </div>

            <button onClick={handleSignUpClick} className="sign-up-btn">SIGN UP</button>

            <div className="alternative-sign">
                <p>OR</p>
                <div className="line"></div>
            </div>

            <p className="log-in-link">Already a user? <Link to='/log-in-page'>LOGIN</Link></p>
        </div>
    )
}

export default SignUp;