import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import algoleapLogo from '../assets/algoleap.png';
import '../styles/style.css';

const Login = () => {
  const [login_username, setUsername] = useState('');
  const [login_password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/algoleap', { login_username, login_password });
      if (res.data.success) {
        navigate(`/algoleap/${login_username}`);
        // <Link to="/create_account"></Link>
      } else {
        setUsernameError(res.data.usernameError);
        setPasswordError(res.data.passwordError);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };  

  const clearErrors = () => {
    setUsernameError('');
    setPasswordError('');
  };

  return (
    <div className="container">
      <div className="upper">
        <div className="logo">
          <img src={algoleapLogo} alt="Algoleap" />
        </div>
      </div>
      <div className="signin">
        <div className="login">Login</div>
        <form className="form" id="login-form" onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              name="login_username"
              value={login_username}
              onChange={(e) => setUsername(e.target.value)}
              required
              onFocus={clearErrors}
            />
            <i>Username</i>
          </div>
          <div className="username-error" style={{ paddingLeft: '10px' }}>{usernameError}</div>
          <div className="inputBox">
            <input
              type="password"
              name="login_password"
              value={login_password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={clearErrors}
            />
            <i>Password</i>
          </div>
          <div className="password-error" style={{ paddingLeft: '10px' }}>{passwordError}</div>
          <div className="links">
            <a href="#" className="forgot-password">Forgot Password?</a>
            <a href="/signup" className="signup">Sign&nbsp;up</a>
            {/* <Link to="/create_account" className="signup">Sign up</Link> */}
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
      <div className="lower">
        <div className="title">Asset Management</div>
      </div>
    </div>
  );
};

export default Login;
