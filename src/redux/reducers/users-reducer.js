import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../actions/user-actions';

import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {},
  loading: true
};

export default function usersReducer(state = initialState, { type, payload }) {
  if (type === 'SAVE' && payload.users)
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.users) }
    };

  switch (type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
}
