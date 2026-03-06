export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export const FETCH_PAGES_REQUEST = 'FETCH_PAGES_REQUEST';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_FAILURE = 'FETCH_PAGES_FAILURE';

export const CREATE_PAGE_REQUEST = 'CREATE_PAGE_REQUEST';
export const CREATE_PAGE_SUCCESS = 'CREATE_PAGE_SUCCESS';
export const CREATE_PAGE_FAILURE = 'CREATE_PAGE_FAILURE';

export const UPDATE_PAGE_REQUEST = 'UPDATE_PAGE_REQUEST';
export const UPDATE_PAGE_SUCCESS = 'UPDATE_PAGE_SUCCESS';
export const UPDATE_PAGE_FAILURE = 'UPDATE_PAGE_FAILURE';

export const DELETE_PAGE_REQUEST = 'DELETE_PAGE_REQUEST';
export const DELETE_PAGE_SUCCESS = 'DELETE_PAGE_SUCCESS';
export const DELETE_PAGE_FAILURE = 'DELETE_PAGE_FAILURE';

export const fetchPage = (slug) => ({
  type: FETCH_PAGE_REQUEST,
  payload: slug
});

export const fetchPages = () => ({
  type: FETCH_PAGES_REQUEST
});

export const createPage = (data) => ({
  type: CREATE_PAGE_REQUEST,
  payload: data
});

export const updatePage = (id, data) => ({
  type: UPDATE_PAGE_REQUEST,
  payload: { id, data }
});

export const deletePage = (id) => ({
  type: DELETE_PAGE_REQUEST,
  payload: id
});
