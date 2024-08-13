import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faBars } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <button className="chatbot-button">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>
      <div className="nav-buttons">
        <button>Sports</button>
        <button>Yoga</button>
        <button>Travel</button>
      </div>
      <button className="menu-button" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item">Settings</button>
          <button className="dropdown-item">Help</button>
          <button className="dropdown-item">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
