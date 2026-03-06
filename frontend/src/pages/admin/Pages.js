import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    template: 'default',
    metaTitle: '',
    metaDescription: '',
    status: 'draft'
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const res = await api.get('/admin/pages');
    setPages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/admin/pages/${editing}`, form);
      } else {
        await api.post('/admin/pages', form);
      }
      setForm({
        title: '',
        slug: '',
        content: '',
        template: 'default',
        metaTitle: '',
        metaDescription: '',
        status: 'draft'
      });
      setEditing(null);
      loadPages();
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (page) => {
    setForm(page);
    setEditing(page.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa trang này?')) {
      await api.delete(`/admin/pages/${id}`);
      loadPages();
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title) => {
    setForm({ ...form, title });
    if (!editing) {
      setForm(prev => ({ ...prev, title, slug: generateSlug(title) }));
    }
  };

  return (
    <AdminLayout>
      <h1>Quản lý Pages</h1>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Tiêu đề trang"
          value={form.title}
          onChange={e => handleTitleChange(e.target.value)}
          required
        />
        
        <input
          placeholder="Slug (URL)"
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          required
        />

        <select
          value={form.template}
          onChange={e => setForm({ ...form, template: e.target.value })}
        >
          <option value="default">Template mặc định</option>
          <option value="full-width">Toàn màn hình</option>
          <option value="sidebar">Có sidebar</option>
        </select>

        <textarea
          placeholder="Nội dung HTML (có thể dùng HTML tags)"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          required
          rows="15"
          style={{ fontFamily: 'monospace' }}
        />

        <input
          placeholder="Meta Title (SEO)"
          value={form.metaTitle}
          onChange={e => setForm({ ...form, metaTitle: e.target.value })}
        />

        <textarea
          placeholder="Meta Description (SEO)"
          value={form.metaDescription}
          onChange={e => setForm({ ...form, metaDescription: e.target.value })}
          rows="3"
        />

        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">Nháp</option>
          <option value="published">Xuất bản</option>
        </select>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">{editing ? 'Cập nhật' : 'Tạo trang'}</button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  title: '',
                  slug: '',
                  content: '',
                  template: 'default',
                  metaTitle: '',
                  metaDescription: '',
                  status: 'draft'
                });
                setEditing(null);
              }}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Slug</th>
            <th>Template</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id}>
              <td>{page.title}</td>
              <td>/{page.slug}</td>
              <td>{page.template}</td>
              <td>{page.status === 'published' ? 'Xuất bản' : 'Nháp'}</td>
              <td>
                <button onClick={() => handleEdit(page)}>Sửa</button>
                <button onClick={() => handleDelete(page.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Pages;
