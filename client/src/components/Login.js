import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Login.css';

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    function handleSubmit(event) {
      event.preventDefault();
      // Example login logic: check if email and password match
      if (email === 'your-email@example.com' && password === 'your-password') {
        // Successful login
        // Reset the form fields
        setEmail('');
        setPassword('');
        setError('');
        // Redirect to the home page or any other protected route
        history.push('/home'); // Replace with the actual route
      } else {
        // Failed login
        setError('Invalid email or password');
      }
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