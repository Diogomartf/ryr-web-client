import UserAPI from '../../api/users-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const fetchUserById = id => dispatch => {
  dispatch({
    type: FETCH_USER_REQUEST,
    payload: { id }
  });

  UserAPI.fetchUserById(id)
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USER_ERROR,
        payload: err.response
      });
    });
};

export const editUser = (id, data) => dispatch => {
  dispatch({
    type: EDIT_USER_REQUEST,
    payload: { id }
  });

  return UserAPI.editUser(id, data)
    .then(response => {
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: response.data
      });
      return true;
    })
    .catch(err => {
      dispatch({
        type: EDIT_USER_ERROR,
        payload: err.response
      });
      return false;
    });
};
