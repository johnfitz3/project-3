import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutation';
import { setAuthToken } from '../utils/auth';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.token;
      setAuthToken(token);
      setEmail('');
      setPassword('');
      setError('');
      history.push('/home');
    },
    onError: (error) => {
      setError('Invalid email or password');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser({ variables: { email, password } });
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h2 className="join-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
