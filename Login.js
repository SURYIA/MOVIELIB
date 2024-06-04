import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('mongodb://localhost:27017/movielib', {
        email,
        password,
      });
      //navigate('/Home');
      // Handle successful login response, e.g., redirect to dashboard
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome To MovieLib</h1>
      <div className="logo">🎥</div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">EMAIL ADDRESS</label>
        <input
          type="email"
          id="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">Login</button>
      </form>
      <div className="signup-link-container">
        Don't have an account? <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default LoginForm;
