import {
  FETCH_VEHICLE_TYPE_LIST_ERROR,
  FETCH_VEHICLE_TYPE_LIST_SUCCESS,
  FETCH_VEHICLE_TYPE_LIST_REQUEST
} from '../actions/vehicle-type-actions';

import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function vehicleTypeReducer(state = initialState, { type, payload }) {
  if (type === 'SAVE' && payload.vehicle_types)
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.vehicle_types) }
    };

  switch (type) {
    case FETCH_VEHICLE_TYPE_LIST_REQUEST:
      return { ...state, loading: true };

    case FETCH_VEHICLE_TYPE_LIST_SUCCESS:
      return { ...state, loading: false };

    case FETCH_VEHICLE_TYPE_LIST_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
}
