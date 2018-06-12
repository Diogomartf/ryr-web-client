import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_ERROR
} from '../actions/home-actions';

const initialState = { results: [], loading: false };

export default function homeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_HOME_REQUEST:
      return { ...state, loading: true };

    case FETCH_HOME_SUCCESS:
      const results = payload.data.map(v => v.id) || [];
      return { ...state, results, loading: false };

    case FETCH_HOME_ERROR: {
      return { ...state, loading: false, error: payload };
    }

    default:
      return state;
  }
}
