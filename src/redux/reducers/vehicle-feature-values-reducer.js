import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function vehicleFeatureValuesReducer(
  state = initialState,
  { type, payload }
) {
  if (type === 'SAVE' && payload.vehicle_feature_values)
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.vehicle_feature_values) }
    };

  switch (type) {
    default:
      return state;
  }
}
