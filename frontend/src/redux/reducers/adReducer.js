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

const initialState = {
  ads: [],
  adsByPosition: {},
  loading: false,
  error: null,
  success: false
};

export const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADS_REQUEST:
    case FETCH_ADS_BY_POSITION_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADS_SUCCESS:
      return { ...state, loading: false, ads: action.payload };
    case FETCH_ADS_BY_POSITION_SUCCESS:
      return {
        ...state,
        loading: false,
        adsByPosition: {
          ...state.adsByPosition,
          [action.payload.position]: action.payload.ads
        }
      };
    case FETCH_ADS_FAILURE:
    case FETCH_ADS_BY_POSITION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATE_AD_REQUEST:
    case UPDATE_AD_REQUEST:
    case DELETE_AD_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CREATE_AD_SUCCESS:
      return {
        ...state,
        loading: false,
        ads: [...state.ads, action.payload],
        success: true
      };
    case UPDATE_AD_SUCCESS:
      return {
        ...state,
        loading: false,
        ads: state.ads.map(a =>
          a.id === action.payload.id ? action.payload : a
        ),
        success: true
      };
    case DELETE_AD_SUCCESS:
      return {
        ...state,
        loading: false,
        ads: state.ads.filter(a => a.id !== action.payload),
        success: true
      };
    case CREATE_AD_FAILURE:
    case UPDATE_AD_FAILURE:
    case DELETE_AD_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
