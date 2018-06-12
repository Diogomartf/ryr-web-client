import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function featuresReducer(state = initialState, { type, payload }) {
  if (type === 'SAVE' && payload.features)
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.features) }
    };

  switch (type) {
    default:
      return state;
  }
}
