import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({ title: '', image: '', link: '', position: 'header', active: true });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    // Sử dụng admin API
    const res = await api.get('/admin/ads');
    setAds(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/admin/ads/${editing}`, form);
    } else {
      await api.post('/admin/ads', form);
    }
    setForm({ title: '', image: '', link: '', position: 'header', active: true });
    setEditing(null);
    loadAds();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa quảng cáo này?')) {
      await api.delete(`/admin/ads/${id}`);
      loadAds();
    }
  };

  return (
    <AdminLayout>
      <h1>Quản lý Quảng cáo</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Tiêu đề" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input placeholder="URL hình ảnh" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
        <input placeholder="Link" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
        <select value={form.position} onChange={e => setForm({...form, position: e.target.value})}>
          <option value="header">Header</option>
          <option value="sidebar">Sidebar</option>
          <option value="footer">Footer</option>
        </select>
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>
      <table className="admin-table">
        <thead>
          <tr><th>Tiêu đề</th><th>Vị trí</th><th>Trạng thái</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.position}</td>
              <td>{ad.active ? 'Hoạt động' : 'Tắt'}</td>
              <td>
                <button onClick={() => { setForm(ad); setEditing(ad.id); }}>Sửa</button>
                <button onClick={() => handleDelete(ad.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Ads;
