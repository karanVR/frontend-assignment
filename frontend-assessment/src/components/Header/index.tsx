import React from 'react';
import './index.css'; 
import saasLabsLogo from '../../assets/logo.png'

const Header: React.FC = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <img src={saasLabsLogo}/>
      </div>
    </header>
  );
};

export default Header;