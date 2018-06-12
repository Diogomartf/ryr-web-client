import { saveById } from '../middlewares/saveMiddleware';

const initialState = {
  byId: {}
};

export default function imagesReducer(state = initialState, { type, payload }) {
  if (type === 'SAVE' && payload.images) {
    state = {
      ...state,
      byId: { ...state.byId, ...saveById(type, payload.images) }
    };
  }

  switch (type) {
    default:
      return state;
  }
}
