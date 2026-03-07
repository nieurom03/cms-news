import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPage } from '../redux/actions/pageActions';
import Header from '../components/Header';

const PageView = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { page, loading, error } = useSelector(state => state.pages);

  useEffect(() => {
    dispatch(fetchPage(slug));
  }, [slug, dispatch]);

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
          <h1 className="text-3xl font-bold text-red-600">Lỗi</h1>
          <p className="text-gray-600 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div>
        <Header />
        <div className="container py-12">
          <h1 className="text-3xl font-bold text-gray-800">Không tìm thấy trang</h1>
          <p className="text-gray-600 mt-4">Trang bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container py-12">
        <article className="card max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{page.title}</h1>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default PageView;
