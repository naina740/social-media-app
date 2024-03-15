import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registeration.css'; // Import the CSS file

export default function Registeration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post('http://localhost:3000/registeration', {
        username: username,
        password: password,
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="form-container">
      <h1>Registration:</h1>
      <form onSubmit={handleForm}>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsername} />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePassword} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}