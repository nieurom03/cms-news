import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../redux/actions/articleActions';
import { fetchAds } from '../redux/actions/adActions';
import Header from '../components/Header';

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
        <div className="container py-12">
          <p className="text-center text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="container py-12">
          <p className="text-center text-red-600">Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container py-8">
        {/* Header Ads */}
        {ads.filter(a => a.position === 'header').map(ad => (
          <div key={ad.id} className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover hover:opacity-90 transition" />
            </a>
          </div>
        ))}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2">
            <div className="grid gap-6">
              {articles.map(article => (
                <article key={article.id} className="card hover:shadow-lg transition">
                  {article.featuredImage && (
                    <img src={article.featuredImage} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <h2 className="text-2xl font-bold mb-2">
                    <Link to={`/article/${article.slug}`} className="text-blue-600 hover:text-blue-800">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span>{article.views} lượt xem</span>
                  </div>
                </article>
              ))}
            </div>
          </main>
          
          {/* Sidebar Ads */}
          <aside className="space-y-6">
            {ads.filter(a => a.position === 'sidebar').map(ad => (
              <div key={ad.id} className="rounded-lg overflow-hidden shadow-lg">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  <img src={ad.image} alt={ad.title} className="w-full hover:opacity-90 transition" />
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
