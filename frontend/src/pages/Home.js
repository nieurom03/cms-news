import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../redux/actions/articleActions';
import { fetchAds } from '../redux/actions/adActions';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(state => state.articles);
  const { ads = [] } = useSelector(state => state.ads);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchAds());
  }, [dispatch]);

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

  if (error) {
    return (
      <div>
        <Header />
        <div className="container">
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container home-page">
        {ads.filter(a => a.position === 'header').map(ad => (
          <div key={ad.id} className="ad-banner">
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img src={ad.image} alt={ad.title} />
            </a>
          </div>
        ))}
        
        <div className="content-wrapper">
          <main className="articles-grid">
            {articles.map(article => (
              <article key={article.id} className="article-card">
                {article.featuredImage && (
                  <img src={article.featuredImage} alt={article.title} />
                )}
                <h2><Link to={`/article/${article.slug}`}>{article.title}</Link></h2>
                <p>{article.excerpt}</p>
                <div className="meta">
                  <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                  <span>{article.views} lượt xem</span>
                </div>
              </article>
            ))}
          </main>
          
          <aside className="sidebar-ads">
            {ads.filter(a => a.position === 'sidebar').map(ad => (
              <div key={ad.id} className="ad-sidebar">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  <img src={ad.image} alt={ad.title} />
                </a>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
