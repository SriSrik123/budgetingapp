import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Submitting signup form...');

    try {
      const res = await axios.post('http://localhost:5000/signup', {
        user_name: username,
        pass_code: password
      });
      console.log('Signup response:', res);
      if (res.status === 201){
        setStatus('Signup Successful!');
      }
      else{
        setStatus('Signup failed, Try again')
      }

      setStatus(res.data.message);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);  // Log error for debugging
      setStatus('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
