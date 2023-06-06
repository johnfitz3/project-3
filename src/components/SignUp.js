import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform sign-up logic here
    // You can make an API call to your server or handle the sign-up process locally

    // Reset the form fields after sign-up
    setName('');
    setEmail('');
    setPassword('');

    // Optionally, you can navigate to the login page here
    // You can replace "/login" with the actual login route in your application
    // Make sure it matches the "path" attribute defined in AppRouter.js
    window.location.href = '/login';
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h2 className='join-heading'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
