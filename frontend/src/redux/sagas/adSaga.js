import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../config/api';
import {
  FETCH_ADS_REQUEST,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAILURE,
  FETCH_ADS_BY_POSITION_REQUEST,
  FETCH_ADS_BY_POSITION_SUCCESS,
  FETCH_ADS_BY_POSITION_FAILURE,
  CREATE_AD_REQUEST,
  CREATE_AD_SUCCESS,
  CREATE_AD_FAILURE,
  UPDATE_AD_REQUEST,
  UPDATE_AD_SUCCESS,
  UPDATE_AD_FAILURE,
  DELETE_AD_REQUEST,
  DELETE_AD_SUCCESS,
  DELETE_AD_FAILURE
} from '../actions/adActions';

function* fetchAdsSaga() {
  try {
    const response = yield call(api.get, '/public/ads');
    yield put({ type: FETCH_ADS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_ADS_FAILURE, payload: error.message });
  }
}

function* fetchAdsByPositionSaga(action) {
  try {
    const response = yield call(api.get, `/public/ads/position/${action.payload}`);
    yield put({
      type: FETCH_ADS_BY_POSITION_SUCCESS,
      payload: { position: action.payload, ads: response.data }
    });
  } catch (error) {
    yield put({ type: FETCH_ADS_BY_POSITION_FAILURE, payload: error.message });
  }
}

function* createAdSaga(action) {
  try {
    const response = yield call(api.post, '/admin/ads', action.payload);
    yield put({ type: CREATE_AD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_AD_FAILURE, payload: error.response?.data?.message });
  }
}

function* updateAdSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(api.put, `/admin/ads/${id}`, data);
    yield put({ type: UPDATE_AD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_AD_FAILURE, payload: error.response?.data?.message });
  }
}

function* deleteAdSaga(action) {
  try {
    yield call(api.delete, `/admin/ads/${action.payload}`);
    yield put({ type: DELETE_AD_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_AD_FAILURE, payload: error.response?.data?.message });
  }
}

export function* adSaga() {
  yield takeEvery(FETCH_ADS_REQUEST, fetchAdsSaga);
  yield takeEvery(FETCH_ADS_BY_POSITION_REQUEST, fetchAdsByPositionSaga);
  yield takeEvery(CREATE_AD_REQUEST, createAdSaga);
  yield takeEvery(UPDATE_AD_REQUEST, updateAdSaga);
  yield takeEvery(DELETE_AD_REQUEST, deleteAdSaga);
}
