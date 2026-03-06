import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/articles">Bài viết</Link>
          <Link to="/admin/pages">Pages</Link>
          <Link to="/admin/categories">Danh mục</Link>
          <Link to="/admin/menus">Menu</Link>
          <Link to="/admin/users">Người dùng</Link>
          <Link to="/admin/ads">Quảng cáo</Link>
        </nav>
        <button onClick={logout} className="logout-btn">Đăng xuất</button>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
