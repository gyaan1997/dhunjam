import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../Api'

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(apiEndpoints.adminLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError('Wrong email or password');
        console.error('Login failed');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="heading">Venue Admin Login</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="signin-button" onClick={handleLogin}>
        Sign In
      </button>
      <span className="registration-span">New Registration?</span>
    </div>
  );
}

export default AdminLogin;
