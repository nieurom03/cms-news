import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/api';
import Header from '../components/Header';
import './PageView.css';

const PageView = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      const res = await api.get(`/public/pages/${slug}`);
      setPage(res.data);
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div>
        <Header />
        <div className="container">
          <h1>Không tìm thấy trang</h1>
          <p>Trang bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={`container page-view page-template-${page.template}`}>
        <article className="page-content">
          <h1>{page.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default PageView;
