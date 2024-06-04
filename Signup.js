import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Ensure this import is present to apply styles

const Signup = () => {
  // State variables to manage input fields and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Function to handle the signup process
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the signup endpoint
      await axios.post('mongodb://localhost:27017/movielib', {
        username,
        password,
      });
      // Navigate to the login page upon successful signup
      navigate('/login');
    } catch (error) {
      // Set error message if the signup process fails
      setError('Error during sign up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="Login-link-container">
        If you have an account? <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Signup;
