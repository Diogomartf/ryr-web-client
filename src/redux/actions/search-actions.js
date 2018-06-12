import VehiclesAPI from '../../api/vehicles-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR';

export const searchVehicles = filters => dispatch => {
  dispatch({
    type: FETCH_SEARCH_REQUEST,
    loading: true
  });

  VehiclesAPI.search(filters)
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });

      dispatch({
        type: FETCH_SEARCH_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_SEARCH_ERROR,
        payload: err.response
      });
    });
};
