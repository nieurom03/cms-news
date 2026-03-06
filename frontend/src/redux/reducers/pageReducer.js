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

const initialState = {
  pages: [],
  page: null,
  loading: false,
  error: null,
  success: false
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
    case FETCH_PAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PAGE_SUCCESS:
      return { ...state, loading: false, page: action.payload };
    case FETCH_PAGES_SUCCESS:
      return { ...state, loading: false, pages: action.payload };
    case FETCH_PAGE_FAILURE:
    case FETCH_PAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PAGE_REQUEST:
    case UPDATE_PAGE_REQUEST:
    case DELETE_PAGE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: [...state.pages, action.payload],
        success: true
      };
    case UPDATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: state.pages.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
        success: true
      };
    case DELETE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: state.pages.filter(p => p.id !== action.payload),
        success: true
      };
    case CREATE_PAGE_FAILURE:
    case UPDATE_PAGE_FAILURE:
    case DELETE_PAGE_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
