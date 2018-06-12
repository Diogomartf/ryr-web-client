import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function vehicleTypeFeaturesReducer(
  state = initialState,
  { type, payload }
) {
  if (type === 'SAVE' && payload.vehicle_type_features)
    return {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.vehicle_type_features) }
    };

  switch (type) {
    default:
      return state;
  }
}
