import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/api';
import Header from '../components/Header';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Sử dụng public API
    api.get(`/public/articles/${slug}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!article) return <div>Đang tải...</div>;

  return (
    <div>
      <Header />
      <div className="container article-detail">
        <h1>{article.title}</h1>
        <div className="meta">
          <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
          <span>{article.views} lượt xem</span>
        </div>
        {article.featuredImage && (
          <img src={article.featuredImage} alt={article.title} />
        )}
        <div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default ArticleDetail;
