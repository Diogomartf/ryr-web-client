import {
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR
} from '../actions/search-actions';

const initialState = { results: [], loading: false };

export default function searchReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SEARCH_REQUEST:
      return { ...state, loading: true };

    case FETCH_SEARCH_SUCCESS:
      const results = payload.data.map(v => v.id) || [];
      return { ...state, results, loading: false };

    case FETCH_SEARCH_ERROR: {
      return { ...state, loading: false, error: payload };
    }

    default:
      return state;
  }
}
