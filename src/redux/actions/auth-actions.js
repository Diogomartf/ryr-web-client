import ApiManager from '../../api/api-manager';
import UserAPI from '../../api/users-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_ERROR = 'FETCH_CURRENT_USER_ERROR';

export const signUp = data => dispatch => {
  dispatch({
    type: SIGNUP_REQUEST
  });

  return UserAPI.signUp(data)
    .then(response => {
      ApiManager.setAuthToken(response.data.data.attributes.auth_token.token);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data
      });

      return true;
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_ERROR,
        payload: err.response
      });

      return false;
    });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({
    type: LOGIN_USER
  });

  return UserAPI.loginUser(email, password)
    .then(response => {
      ApiManager.setAuthToken(response.data.jwt);

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data
      });

      return true;
    })
    .catch(err => {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err.response
      });

      return false;
    });
};

export const logoutUser = () => dispatch => {
  ApiManager.removeAuthToken();

  dispatch({
    type: LOGOUT_USER
  });
};

export const fetchCurrentUser = () => dispatch => {
  dispatch({
    type: FETCH_CURRENT_USER_REQUEST
  });

  return UserAPI.fetchCurrentUser()
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });

      dispatch({
        type: FETCH_CURRENT_USER_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_CURRENT_USER_ERROR,
        payload: err.response
      });
    });
};
