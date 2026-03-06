import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPage } from '../redux/actions/pageActions';
import Header from '../components/Header';
import './PageView.css';

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
          <h1>Lỗi</h1>
          <p>{error}</p>
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
