import {
  FETCH_RENTAL_REQUEST,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTAL_ERROR,
  CREATE_RENTAL_REQUEST,
  CREATE_RENTAL_SUCCESS,
  CREATE_RENTAL_ERROR
} from '../actions/rental-actions';

export default function RentalReducer(
  state = {
    loading: false
  },
  { type, payload }
) {
  switch (type) {
    case FETCH_RENTAL_REQUEST:
      return { ...state, loading: true };
    case FETCH_RENTAL_SUCCESS:
      return { ...state, results: payload, loading: false };
    case FETCH_RENTAL_ERROR:
      return { ...state, loading: false, error: payload };

    case CREATE_RENTAL_REQUEST:
      return { ...state, loading: true };
    case CREATE_RENTAL_SUCCESS:
      return { ...state, results: payload, loading: false };
    case CREATE_RENTAL_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}
