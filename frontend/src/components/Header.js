import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Tin Tức 24h</Link>
        <Navigation location="header" />
      </div>
    </header>
  );
};

export default Header;
