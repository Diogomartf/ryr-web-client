import {
  FETCH_PAYMENT_REQUEST,
  FETCH_PAYMENT_SUCCESS,
  FETCH_PAYMENT_ERROR,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR
} from '../actions/payment-actions';

export default function PaymentReducer(
  state = {
    loading: false
  },
  { type, payload }
) {
  switch (type) {
    case FETCH_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case FETCH_PAYMENT_SUCCESS:
      return { ...state, results: payload, loading: false };
    case FETCH_PAYMENT_ERROR:
      return { ...state, loading: false, error: payload };

    case CREATE_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_PAYMENT_SUCCESS:
      return { ...state, results: payload, loading: false };
    case CREATE_PAYMENT_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
