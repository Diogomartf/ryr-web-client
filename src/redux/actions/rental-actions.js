import RentalAPI from '../../api/rental-api';

export const FETCH_RENTAL_REQUEST = 'FETCH_RENTAL_REQUEST';
export const FETCH_RENTAL_SUCCESS = 'FETCH_RENTAL_SUCCESS';
export const FETCH_RENTAL_ERROR = 'FETCH_RENTAL_ERROR';

export const CREATE_RENTAL_REQUEST = 'CREATE_RENTAL_REQUEST';
export const CREATE_RENTAL_SUCCESS = 'CREATE_RENTAL_SUCCESS';
export const CREATE_RENTAL_ERROR = 'CREATE_RENTAL_ERROR';

export const fetchRental = id => dispatch => {
  dispatch({
    type: FETCH_RENTAL_REQUEST,
    loading: true
  });

  RentalAPI.fetchRental(id)
    .then(response => {
      dispatch({
        type: FETCH_RENTAL_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_RENTAL_ERROR,
        payload: err.response
      });
      return false;
    });
};

export const createRental = (from, to, vehicle, user) => dispatch => {
  dispatch({
    type: CREATE_RENTAL_REQUEST,
    loading: true
  });

  RentalAPI.createRental(from, to, vehicle, user)
    .then(response => {
      dispatch({
        type: CREATE_RENTAL_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_RENTAL_ERROR,
        payload: err.response
      });
      return false;
    });
};
