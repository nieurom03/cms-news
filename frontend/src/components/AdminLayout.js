import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Dashboard</Link>
            <Link to="/admin/articles" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Bài viết</Link>
            <Link to="/admin/pages" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Pages</Link>
            <Link to="/admin/categories" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Danh mục</Link>
            <Link to="/admin/menus" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Menu</Link>
            <Link to="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Người dùng</Link>
            <Link to="/admin/ads" className="block px-4 py-2 rounded hover:bg-gray-700 transition">Quảng cáo</Link>
          </nav>
          <button
            onClick={logout}
            className="w-full mt-8 btn-danger"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
