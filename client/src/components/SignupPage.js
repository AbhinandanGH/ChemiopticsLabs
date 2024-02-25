import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ onCreateAccount, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Perform signup validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            // Perform signup action (for example, register the user)
            // After successful signup, navigate to the login page
            onCreateAccount();
            navigate('/login'); // Redirect to the login page after signing up
            // Optionally, automatically login the user after signing up
            // onLogin();
        }
    };
    
    const handleLogin = () => {
        onLogin();
        navigate('/login');
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSignup}>
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
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className="login-link">
                <p>Already have an account? <span onClick={handleLogin}>Login</span></p>
            </div>
        </div>
    );
};

export default SignupPage;
