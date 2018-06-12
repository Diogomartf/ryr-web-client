import VehicleTypesAPI from '../../api/vehicle-types-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const FETCH_VEHICLE_TYPE_LIST_REQUEST = 'FETCH_VEHICLE_TYPE_LIST_REQUEST';
export const FETCH_VEHICLE_TYPE_LIST_SUCCESS = 'FETCH_VEHICLE_TYPE_LIST_SUCCESS';
export const FETCH_VEHICLE_TYPE_LIST_ERROR = 'FETCH_VEHICLE_TYPE_LIST_ERROR';

export const fetchVehicleTypesList = () => dispatch => {
  dispatch({
    type: FETCH_VEHICLE_TYPE_LIST_REQUEST
  });

  VehicleTypesAPI.fetchAllVehicleTypes()
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });
      dispatch({
        type: FETCH_VEHICLE_TYPE_LIST_SUCCESS,
        payload: response.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_VEHICLE_TYPE_LIST_ERROR,
        payload: err.response
      });
    });
};
