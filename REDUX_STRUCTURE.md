# Redux + Redux Saga Architecture

## Cấu trúc thư mục

```
frontend/src/redux/
├── actions/
│   ├── articleActions.js      # Action types & creators cho articles
│   └── pageActions.js         # Action types & creators cho pages
├── reducers/
│   ├── articleReducer.js      # Reducer cho articles
│   └── pageReducer.js         # Reducer cho pages
├── sagas/
│   ├── articleSaga.js         # Saga cho articles (API calls)
│   └── pageSaga.js            # Saga cho pages (API calls)
└── store.js                   # Redux store configuration
```

## Luồng dữ liệu

```
Component
    ↓
dispatch(action)
    ↓
Saga (xử lý async, gọi API)
    ↓
dispatch(success/failure action)
    ↓
Reducer (cập nhật state)
    ↓
Component re-render (useSelector)
```

## Ví dụ: Fetch Articles

### 1. Action (articleActions.js)
```javascript
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

export const fetchArticles = () => ({
  type: FETCH_ARTICLES_REQUEST
});
```

### 2. Saga (articleSaga.js)
```javascript
function* fetchArticlesSaga() {
  try {
    const response = yield call(api.get, '/public/articles');
    yield put({ type: FETCH_ARTICLES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_ARTICLES_FAILURE, payload: error.message });
  }
}

export function* articleSaga() {
  yield takeEvery(FETCH_ARTICLES_REQUEST, fetchArticlesSaga);
}
```

### 3. Reducer (articleReducer.js)
```javascript
const initialState = {
  articles: [],
  loading: false,
  error: null
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, loading: false, articles: action.payload };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### 4. Component (Home.js)
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/actions/articleActions';

const Home = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(state => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
};
```

## Redux Saga Effects

### call
Gọi function (thường là API call)
```javascript
const response = yield call(api.get, '/articles');
```

### put
Dispatch action
```javascript
yield put({ type: FETCH_SUCCESS, payload: data });
```

### takeEvery
Lắng nghe action và chạy saga
```javascript
yield takeEvery(FETCH_REQUEST, fetchSaga);
```

### fork
Chạy saga song song
```javascript
yield fork(articleSaga);
yield fork(pageSaga);
```

## Lợi ích

1. **Centralized State** - Tất cả state ở một nơi
2. **Predictable** - Dễ debug và trace
3. **Async Handling** - Saga xử lý async operations
4. **Reusable** - Actions, reducers, sagas có thể tái sử dụng
5. **Testable** - Dễ viết unit tests

## Cách sử dụng trong Component

### Fetch data
```javascript
const { articles, loading, error } = useSelector(state => state.articles);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchArticles());
}, [dispatch]);
```

### Create/Update/Delete
```javascript
const handleCreate = (data) => {
  dispatch(createArticle(data));
};

const handleUpdate = (id, data) => {
  dispatch(updateArticle(id, data));
};

const handleDelete = (id) => {
  dispatch(deleteArticle(id));
};
```

## Thêm Redux DevTools (tùy chọn)

```bash
npm install redux-devtools-extension
```

Cập nhật store.js:
```javascript
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
```

Sau đó cài Redux DevTools extension cho browser để debug.
