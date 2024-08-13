// src/components/Header.js

import React, { useState } from 'react';
import About from './about';
import './header.css';

function Header() {
  const [showAbout, setShowAbout] = useState(false);
  const toggleAbout = (e) => {
    e.preventDefault();
    setShowAbout(!showAbout);
  };

  return (
    <header className="header">
      <div className="logo">AdventureBlog</div>
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={toggleAbout}>About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="/auth">Login</a></li>
        </ul>
      </nav>

      {showAbout && (
        <div className="overlay">
          <div className="modal">
            <About />
            <button onClick={toggleAbout} className="close-button">Close</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
