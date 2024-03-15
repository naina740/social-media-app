import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Import the CSS file

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/posts');
      }
    } catch (error) {
      setLoginError('Invalid Username or Password');
    }
  };

  return (
    <div className="containerrr">
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <div className="form-group">
          <label>Username :</label>
          <input className="user" type="text" value={username} onChange={handleUsername} />
        </div>
        <div className="form-group">
          <label>Password :</label>
          <input className ="pass" type="password" value={password} onChange={handlePassword} />
        </div>
        <div className="form-group">
          <button>Submit</button>
        </div>
      </form>
      {loginError && <div className="error-message">{loginError}</div>}
    </div>
  );
}
