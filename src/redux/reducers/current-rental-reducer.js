const initialState = {
  from: undefined,
  to: undefined,
  url: undefined,
  address: undefined,
  lat: undefined,
  lng: undefined
};

export default function currentRentalReducer(state = initialState, { type, payload }) {
  if (type === 'UPDATE_CURRENT_RENTAL') {
    state = {
      ...state,
      ...payload.searchParams
    };
  }

  switch (type) {
    default:
      return state;
  }
}
