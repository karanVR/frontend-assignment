import React from 'react';
import './index.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <ul className="footer-services">
          <li>Careers</li>
          <li>Partnership</li>
          <li>About us</li>
          <li>Tech @ SaaS Labs</li>
          <li>JustCall</li>
          <li>Helpwise</li>
          <li>CallPage</li>
          <li>Workspace</li>
          <li>Callroot</li>
          <li>EasyCalendar</li>
        </ul>
      </div>
      <div className="footer-section">
        <p className="footer-address">
          United States: 355 Bryant Street, #403 San Francisco California 94107
        </p>
        <p className="footer-address">
          India: Plot A 13 A, 7th Floor, Graphix Tower, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309
        </p>
      </div>
    </footer>
  );
};

export default Footer;
