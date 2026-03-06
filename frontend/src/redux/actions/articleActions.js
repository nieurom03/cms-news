export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const FETCH_ARTICLE_DETAIL_REQUEST = 'FETCH_ARTICLE_DETAIL_REQUEST';
export const FETCH_ARTICLE_DETAIL_SUCCESS = 'FETCH_ARTICLE_DETAIL_SUCCESS';
export const FETCH_ARTICLE_DETAIL_FAILURE = 'FETCH_ARTICLE_DETAIL_FAILURE';

export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';

export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';

// Action creators
export const fetchArticles = () => ({
  type: FETCH_ARTICLES_REQUEST
});

export const fetchArticleDetail = (slug) => ({
  type: FETCH_ARTICLE_DETAIL_REQUEST,
  payload: slug
});

export const createArticle = (data) => ({
  type: CREATE_ARTICLE_REQUEST,
  payload: data
});

export const updateArticle = (id, data) => ({
  type: UPDATE_ARTICLE_REQUEST,
  payload: { id, data }
});

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE_REQUEST,
  payload: id
});
