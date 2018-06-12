import {
  CREATE_BILLING_INFO,
  CREATE_BILLING_INFO_SUCCESS,
  CREATE_BILLING_INFO_ERROR,
  FETCH_BILLING_INFO_REQUEST,
  FETCH_BILLING_INFO_SUCCESS,
  FETCH_BILLING_INFO_ERROR
} from '../actions/billingInfo-actions';

export default function billingInfoReducer(
  state = {
    loading: false
  },
  { type, payload }
) {
  switch (type) {
    case CREATE_BILLING_INFO:
      return { ...state, loading: true };
    case CREATE_BILLING_INFO_SUCCESS:
      return { ...state, results: payload, loading: false };
    case CREATE_BILLING_INFO_ERROR:
      return { ...state, error: payload, loading: false };

    case FETCH_BILLING_INFO_REQUEST:
      return { ...state, loading: true };
    case FETCH_BILLING_INFO_SUCCESS:
      return { ...state, results: payload, loading: false };
    case FETCH_BILLING_INFO_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
