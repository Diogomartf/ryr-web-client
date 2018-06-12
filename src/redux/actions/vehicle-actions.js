import VehicleAPI from '../../api/vehicles-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const FETCH_VEHICLE_REQUEST = 'FETCH_VEHICLE_REQUEST';
export const FETCH_VEHICLE_SUCCESS = 'FETCH_VEHICLE_SUCCESS';
export const FETCH_VEHICLE_ERROR = 'FETCH_VEHICLE_ERROR';

export const POST_VEHICLE_REQUEST = 'POST_VEHICLE_REQUEST';
export const POST_VEHICLE_SUCCESS = 'POST_VEHICLE_SUCCESS';
export const POST_VEHICLE_ERROR = 'POST_VEHICLE_ERROR';

export const fetchVehicleById = id => dispatch => {
  dispatch({
    type: FETCH_VEHICLE_REQUEST,
    payload: { id }
  });

  VehicleAPI.fetchVehicleById(id)
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });

      dispatch({
        type: FETCH_VEHICLE_SUCCESS,
        payload: { id }
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_VEHICLE_ERROR,
        payload: err.response
      });
    });
};

export const postVehicle = data => dispatch => {
  dispatch({
    type: POST_VEHICLE_REQUEST
  });

  VehicleAPI.postVehicle(data)
    .then(response => {
      dispatch({
        type: POST_VEHICLE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_VEHICLE_ERROR,
        payload: err.response
      });
    });
};
