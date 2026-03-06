export const FETCH_ADS_REQUEST = 'FETCH_ADS_REQUEST';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';

export const FETCH_ADS_BY_POSITION_REQUEST = 'FETCH_ADS_BY_POSITION_REQUEST';
export const FETCH_ADS_BY_POSITION_SUCCESS = 'FETCH_ADS_BY_POSITION_SUCCESS';
export const FETCH_ADS_BY_POSITION_FAILURE = 'FETCH_ADS_BY_POSITION_FAILURE';

export const CREATE_AD_REQUEST = 'CREATE_AD_REQUEST';
export const CREATE_AD_SUCCESS = 'CREATE_AD_SUCCESS';
export const CREATE_AD_FAILURE = 'CREATE_AD_FAILURE';

export const UPDATE_AD_REQUEST = 'UPDATE_AD_REQUEST';
export const UPDATE_AD_SUCCESS = 'UPDATE_AD_SUCCESS';
export const UPDATE_AD_FAILURE = 'UPDATE_AD_FAILURE';

export const DELETE_AD_REQUEST = 'DELETE_AD_REQUEST';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';

export const fetchAds = () => ({
  type: FETCH_ADS_REQUEST
});

export const fetchAdsByPosition = (position) => ({
  type: FETCH_ADS_BY_POSITION_REQUEST,
  payload: position
});

export const createAd = (data) => ({
  type: CREATE_AD_REQUEST,
  payload: data
});

export const updateAd = (id, data) => ({
  type: UPDATE_AD_REQUEST,
  payload: { id, data }
});

export const deleteAd = (id) => ({
  type: DELETE_AD_REQUEST,
  payload: id
});
