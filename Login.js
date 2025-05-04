import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/shared/Layout';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear error on submit
  
      try {
          // Make a request to the backend to authenticate the user
          const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: email, password: password }),
          });
  
          const data = await response.json();
          if (response.status !== 200) {
              throw new Error(data.message || 'Login failed');
          }
  
          const userData = data.user;
          login(userData);
          navigate(userData.role.name === 'Admin' ? '/admin' : '/dashboard');
      } catch (err) {
          setError(err.message); // Display any error that occurred
      }
  };

  return (
    <Layout>
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="test-credentials">
          <h3>Test Credentials:</h3>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </Layout>
  );
};

export default Login; 