import BillingInfoAPI from '../../api/billingInfo-api';

export const CREATE_BILLING_INFO = 'CREATE_BILLING_INFO';
export const CREATE_BILLING_INFO_SUCCESS = 'CREATE_BILLING_INFO_SUCCESS';
export const CREATE_BILLING_INFO_ERROR = 'CREATE_BILLING_INFO_ERROR';

export const FETCH_BILLING_INFO_REQUEST = 'FETCH_BILLING_INFO_REQUEST';
export const FETCH_BILLING_INFO_SUCCESS = 'FETCH_BILLING_INFO_SUCCESS';
export const FETCH_BILLING_INFO_ERROR = 'FETCH_BILLING_INFO_ERROR';

export const createBillingInfo = (
  user_id,
  street_address,
  city,
  state,
  postal_code,
  country
) => dispatch => {
  dispatch({
    type: CREATE_BILLING_INFO
  });

  return BillingInfoAPI.createBillingInfo(
    user_id,
    street_address,
    city,
    state,
    postal_code,
    country
  )
    .then(response => {
      dispatch({
        type: CREATE_BILLING_INFO_SUCCESS,
        payload: response.data.data
      });
      return true;
    })
    .catch(err => {
      dispatch({
        type: CREATE_BILLING_INFO_ERROR,
        payload: err.response
      });
      return false;
    });
};

export const fetchBillingInfo = () => dispatch => {
  dispatch({
    type: FETCH_BILLING_INFO_REQUEST,
    loading: true
  });

  BillingInfoAPI.fetchBillingInfo()
    .then(response => {
      dispatch({
        type: FETCH_BILLING_INFO_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BILLING_INFO_ERROR,
        payload: err.response
      });
      return false;
    });
};
