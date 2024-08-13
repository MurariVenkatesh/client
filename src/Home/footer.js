import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">About Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div className="social-media">
        <a href="#"><img src="https://via.placeholder.com/20" alt="Facebook" /></a>
        <a href="#"><img src="https://via.placeholder.com/20" alt="Twitter" /></a>
        <a href="#"><img src="https://via.placeholder.com/20" alt="Instagram" /></a>
      </div>
      <div className="contact-info">
        <p>Contact us: info@adventureblog.com</p>
      </div>
    </footer>
  );
}

export default Footer;
