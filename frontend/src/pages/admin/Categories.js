import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    // Sử dụng admin API
    const res = await api.get('/admin/categories');
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/admin/categories/${editing}`, form);
    } else {
      await api.post('/admin/categories', form);
    }
    setForm({ name: '', slug: '', description: '' });
    setEditing(null);
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa danh mục này?')) {
      await api.delete(`/admin/categories/${id}`);
      loadCategories();
    }
  };

  return (
    <AdminLayout>
      <h1>Quản lý Danh mục</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Tên danh mục" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required />
        <input placeholder="Mô tả" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>
      <table className="admin-table">
        <thead>
          <tr><th>Tên</th><th>Slug</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <button onClick={() => { setForm(cat); setEditing(cat.id); }}>Sửa</button>
                <button onClick={() => handleDelete(cat.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Categories;
