import { FETCH_VEHICLE_REQUEST, FETCH_VEHICLE_SUCCESS } from '../actions/vehicle-actions';

import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function vehiclesReducer(state = initialState, { type, payload }) {
  if (type === 'SAVE' && payload.vehicles) {
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.vehicles) }
    };
  }

  switch (type) {
    case FETCH_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
