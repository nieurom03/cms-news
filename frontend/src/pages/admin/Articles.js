import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import AdminLayout from '../../components/AdminLayout';
import './Admin.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    // Sử dụng admin API
    const res = await api.get('/admin/articles');
    setArticles(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/admin/articles/${editing}`, form);
    } else {
      await api.post('/admin/articles', form);
    }
    setForm({ title: '', slug: '', content: '', excerpt: '', status: 'draft' });
    setEditing(null);
    loadArticles();
  };

  const handleEdit = (article) => {
    setForm(article);
    setEditing(article.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xóa bài viết này?')) {
      await api.delete(`/admin/articles/${id}`);
      loadArticles();
    }
  };

  return (
    <AdminLayout>
      <h1>Quản lý Bài viết</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Tiêu đề" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required />
        <textarea placeholder="Nội dung" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required />
        <input placeholder="Tóm tắt" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="draft">Nháp</option>
          <option value="published">Xuất bản</option>
        </select>
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>
      <table className="admin-table">
        <thead>
          <tr><th>Tiêu đề</th><th>Trạng thái</th><th>Lượt xem</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>{article.views}</td>
              <td>
                <button onClick={() => handleEdit(article)}>Sửa</button>
                <button onClick={() => handleDelete(article.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Articles;
