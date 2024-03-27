import React, { useState } from 'react';
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './LoginPage.css';


const LoginPage = ({ onLogin, onCreateAccount }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const history=useNavigate();

    async function handleLogin (e) {
        e.preventDefault();
       // Perform authentication
        if (username === 'admin' && password === 'password') {
            onLogin();
            navigate('/client-form');
        } 
        else if(username === 'admin1' && password === 'password1'){
            onLogin();
            navigate('/ticksheet');
        }
        else {
            setError('Invalid username or password');
        }

       
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form action="POST" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="signup-link">
                <p>Don't have an account? </p><span onClick={handleCreateAccount}>Sign up</span>
            </div>
        </div>
    );
};

export default LoginPage;
