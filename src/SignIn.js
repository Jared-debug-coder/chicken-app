import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSignIn, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (username && password) {
      onSignIn();
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="sign-in">
      <h2>Welcome to EggTrack</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Log in</button>
      
      <p>Don't have an account?</p>
      <button onClick={onSignUp}>Sign Up</button>
    </div>
  );
};

export default SignIn;
