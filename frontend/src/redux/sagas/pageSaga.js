import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../config/api';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  FETCH_PAGES_REQUEST,
  FETCH_PAGES_SUCCESS,
  FETCH_PAGES_FAILURE,
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_FAILURE,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAILURE,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAILURE
} from '../actions/pageActions';

function* fetchPageSaga(action) {
  try {
    const response = yield call(api.get, `/public/pages/${action.payload}`);
    yield put({ type: FETCH_PAGE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_PAGE_FAILURE, payload: error.message });
  }
}

function* fetchPagesSaga() {
  try {
    const response = yield call(api.get, '/admin/pages');
    yield put({ type: FETCH_PAGES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_PAGES_FAILURE, payload: error.message });
  }
}

function* createPageSaga(action) {
  try {
    const response = yield call(api.post, '/admin/pages', action.payload);
    yield put({ type: CREATE_PAGE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_PAGE_FAILURE, payload: error.response?.data?.message });
  }
}

function* updatePageSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(api.put, `/admin/pages/${id}`, data);
    yield put({ type: UPDATE_PAGE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_PAGE_FAILURE, payload: error.response?.data?.message });
  }
}

function* deletePageSaga(action) {
  try {
    yield call(api.delete, `/admin/pages/${action.payload}`);
    yield put({ type: DELETE_PAGE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PAGE_FAILURE, payload: error.response?.data?.message });
  }
}

export function* pageSaga() {
  yield takeEvery(FETCH_PAGE_REQUEST, fetchPageSaga);
  yield takeEvery(FETCH_PAGES_REQUEST, fetchPagesSaga);
  yield takeEvery(CREATE_PAGE_REQUEST, createPageSaga);
  yield takeEvery(UPDATE_PAGE_REQUEST, updatePageSaga);
  yield takeEvery(DELETE_PAGE_REQUEST, deletePageSaga);
}
