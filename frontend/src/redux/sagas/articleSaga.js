import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../config/api';
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

// Fetch articles
function* fetchArticlesSaga() {
  try {
    const response = yield call(api.get, '/public/articles');
    yield put({ type: FETCH_ARTICLES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_ARTICLES_FAILURE, payload: error.message });
  }
}

// Fetch article detail
function* fetchArticleDetailSaga(action) {
  try {
    const response = yield call(api.get, `/public/articles/${action.payload}`);
    yield put({ type: FETCH_ARTICLE_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_ARTICLE_DETAIL_FAILURE, payload: error.message });
  }
}

// Create article
function* createArticleSaga(action) {
  try {
    const response = yield call(api.post, '/admin/articles', action.payload);
    yield put({ type: CREATE_ARTICLE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_ARTICLE_FAILURE, payload: error.response?.data?.message });
  }
}

// Update article
function* updateArticleSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(api.put, `/admin/articles/${id}`, data);
    yield put({ type: UPDATE_ARTICLE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_ARTICLE_FAILURE, payload: error.response?.data?.message });
  }
}

// Delete article
function* deleteArticleSaga(action) {
  try {
    yield call(api.delete, `/admin/articles/${action.payload}`);
    yield put({ type: DELETE_ARTICLE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_ARTICLE_FAILURE, payload: error.response?.data?.message });
  }
}

export function* articleSaga() {
  yield takeEvery(FETCH_ARTICLES_REQUEST, fetchArticlesSaga);
  yield takeEvery(FETCH_ARTICLE_DETAIL_REQUEST, fetchArticleDetailSaga);
  yield takeEvery(CREATE_ARTICLE_REQUEST, createArticleSaga);
  yield takeEvery(UPDATE_ARTICLE_REQUEST, updateArticleSaga);
  yield takeEvery(DELETE_ARTICLE_REQUEST, deleteArticleSaga);
}
