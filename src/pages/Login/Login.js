// src/pages/Login/Login.jsx - Simple Login Page component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'password') {
      setMessage('Login successful!');
      // In a real app, you would set authentication state (e.g., via Context or Firebase)
      // and redirect the user.
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Login to Purple Apple</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {message && <p className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        </form>
        <p className="signup-link-text">
          Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
