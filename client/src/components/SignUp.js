import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutation';
import '../styles/Login.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setEmail('');
      setPassword('');
      history.push('/login');
    },
  });
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
     await registerUser({ variables: { email, password } });
  }catch (e){
    console.log(e)
  }};

  return (
    <div className="join-container">
      <div className="join-box">
        <h2 className='join-heading'>Sign Up</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p>Error occurred while signing up</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
