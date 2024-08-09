// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './style.css'; // Assume the styles are similar
import algoleapLogo from '../assets/algoleap.png';
import '../styles/style.css';

const Signup = () => {
  const [signin_username, setUsername] = useState('');
  const [signin_password, setPassword] = useState('');
  const [checkUsername, setCheckUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/algoleap/create_account', { signin_username, signin_password });
      if (res.data.success) {
        navigate(`/algoleap/${signin_username}`);
      } else {
        setCheckUsername(res.data.checkUsername);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const clearErrorsInCreateAccount = () => {
    setCheckUsername('');
  };

  return (
    <div className="container">
      <div className="upper">
        <div className="logo">
          <img src={algoleapLogo} alt="Algoleap" />
        </div>
      </div>
      <div className="signin">
        <div className="login">Sign Up</div>
        <form className="form" id="signin-form" onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              name="signin_username"
              value={signin_username}
              onChange={(e) => setUsername(e.target.value)}
              required
              onFocus={clearErrorsInCreateAccount}
            />
            <i>Username</i>
          </div>
          <div className="check-username" style={{ color: 'red', paddingLeft: '10px' }}>{checkUsername}</div>
          <div className="inputBox">
            <input
              type="password"
              name="signin_password"
              value={signin_password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={clearErrorsInCreateAccount}
            />
            <i>Password</i>
          </div>
          <div className="inputBox signup-btns">
            <a href="/" className="cancel-signup">Cancel</a>
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>
      <div className="lower">
        <div className="title">Asset Management</div>
      </div>
    </div>
  );
};

export default Signup;
