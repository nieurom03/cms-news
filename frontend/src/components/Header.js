import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">
          Tin Tức 24h
        </Link>
        <Navigation location="header" />
      </div>
    </header>
  );
};

export default Header;
