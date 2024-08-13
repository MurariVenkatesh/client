import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <button className="footer-icon">
        <FontAwesomeIcon icon={faHome} />
      </button>
      <button className="footer-icon">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button className="footer-icon">
        <FontAwesomeIcon icon={faComments} />
      </button>
      <button className="footer-icon">
        <FontAwesomeIcon icon={faUser} />
      </button>
    </footer>
  );
};

export default Footer;
