import React, { useState, useEffect } from 'react';
import './Style.css';
import axios from 'axios';


const Register = () => {
    const [isLoginActive, setIsLoginActive] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const signupHeader = document.querySelector(".signup header");
        const loginHeader = document.querySelector(".login header");

        const handleLoginClick = () => {
            setIsLoginActive(true);
        };

        const handleSignupClick = () => {
            setIsLoginActive(false);
        };

        loginHeader.addEventListener("click", handleLoginClick);
        signupHeader.addEventListener("click", handleSignupClick);

        // Cleanup event listeners on component unmount
        return () => {
            loginHeader.removeEventListener("click", handleLoginClick);
            signupHeader.removeEventListener("click", handleSignupClick);
        };
    }, []);

    const handleSubmitR = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/users/signup', { email, password });
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response.data.error);
        }
      };

      const handleSubmitL = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response.data.error);
        }
      };

    return (
        <section className={`wrapper ${isLoginActive ? 'active' : ''}`}>
            <div className="form signup">
                <header>Signup</header>
                <form action="#" onSubmit={handleSubmitR}>
                    <input type="text" placeholder="Full name" required />
                    <input type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <div className="checkbox">
                        <input type="checkbox" id="signupCheck" />
                        <label htmlFor="signupCheck">I accept all terms & conditions</label>
                    </div>
                    <input type="submit" value="Signup" />
                </form>
                {message && <p style={{color:'yellow'}}>{message}</p>}
            </div>

            <div className="form login">
                <header>Login</header>
                <form action="#" onSubmit={handleSubmitL}>
                    <input type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <input type="submit" value="Login" />
                </form>
                {message && <p style={{color:'yellow'}}>{message}</p>}
            </div>
        </section>
    );
}

export default Register