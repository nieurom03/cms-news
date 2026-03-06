import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_DETAIL_REQUEST,
  FETCH_ARTICLE_DETAIL_SUCCESS,
  FETCH_ARTICLE_DETAIL_FAILURE,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE
} from '../actions/articleActions';

const initialState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  success: false
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch articles
    case FETCH_ARTICLES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Fetch article detail
    case FETCH_ARTICLE_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLE_DETAIL_SUCCESS:
      return { ...state, loading: false, article: action.payload };
    case FETCH_ARTICLE_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create article
    case CREATE_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, action.payload],
        success: true
      };
    case CREATE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    // Update article
    case UPDATE_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.map(a =>
          a.id === action.payload.id ? action.payload : a
        ),
        success: true
      };
    case UPDATE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    // Delete article
    case DELETE_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: state.articles.filter(a => a.id !== action.payload),
        success: true
      };
    case DELETE_ARTICLE_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
