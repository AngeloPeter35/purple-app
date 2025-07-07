import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react'; 

import './Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    // Basic validation, Do I send to a backend ?
    if (fullName && email && password) {
      setMessage('Account created successfully!');
      // send data to an authentication service
      // and then redirect the user to a dashboard or login page.
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <UserPlus size={64} className="signup-icon" /> {/* Signup icon */}
        <h2 className="signup-title">Create Your Purple Apple Account</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="signup-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="signup-input"
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
              className="signup-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="signup-input"
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          {message && <p className={`signup-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        </form>
        <p className="login-link-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;