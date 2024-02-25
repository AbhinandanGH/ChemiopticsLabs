import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin, onCreateAccount }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
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
            <form onSubmit={handleLogin}>
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
