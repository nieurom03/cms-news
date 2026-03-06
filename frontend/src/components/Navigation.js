import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import './Navigation.css';

const Navigation = ({ location = 'header' }) => {
  const [menu, setMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    loadMenu();
  }, [location]);

  const loadMenu = async () => {
    try {
      const res = await api.get(`/public/menus/${location}`);
      setMenu(res.data);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  const toggleSubmenu = (itemId) => {
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };

  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id} className={`menu-item ${hasChildren ? 'has-submenu' : ''}`}>
        {item.url ? (
          <Link to={item.url} target={item.target}>
            {item.label}
          </Link>
        ) : (
          <span onClick={() => hasChildren && toggleSubmenu(item.id)}>
            {item.label}
            {hasChildren && <span className="submenu-arrow">▼</span>}
          </span>
        )}
        
        {hasChildren && (
          <ul className={`submenu ${openSubmenu === item.id ? 'open' : ''}`}>
            {item.children.map(child => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  if (!menu || !menu.items || menu.items.length === 0) {
    return null;
  }

  return (
    <nav className={`navigation navigation-${location}`}>
      <ul className="menu">
        {menu.items.map(item => renderMenuItem(item))}
      </ul>
    </nav>
  );
};

export default Navigation;
