import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'; // Import the CSS file

export default function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our Site!</h1>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/registeration">
          <button>Register</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
      </div>
    </div>
  );
}