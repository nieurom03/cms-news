import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { articleReducer } from './reducers/articleReducer';
import { pageReducer } from './reducers/pageReducer';
import { adReducer } from './reducers/adReducer';
import { articleSaga } from './sagas/articleSaga';
import { pageSaga } from './sagas/pageSaga';
import { adSaga } from './sagas/adSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  articles: articleReducer,
  pages: pageReducer,
  ads: adReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

function* rootSaga() {
  yield fork(articleSaga);
  yield fork(pageSaga);
  yield fork(adSaga);
}

sagaMiddleware.run(rootSaga);
