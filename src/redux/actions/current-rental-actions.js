export const updateCurrentRental = searchParams => dispatch => {
  dispatch({
    type: 'UPDATE_CURRENT_RENTAL',
    payload: { searchParams }
  });
};
