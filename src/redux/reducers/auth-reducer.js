import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_ERROR
} from '../actions/auth-actions';
import { AUTH_TOKEN_STORAGE_KEY } from '../../api/api-manager';

const initialState = {
  authToken: localStorage.getItem(AUTH_TOKEN_STORAGE_KEY),
  currentUserId: undefined,
  loading: false,
  error: false
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: false };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: payload.data.attributes.auth_token.token,
        error: false
      };
    case SIGNUP_ERROR:
      return { ...state, loading: false, error: payload.data };

    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, authToken: payload.jwt, loading: false };
    case LOGIN_USER_ERROR:
      return { ...state, error: payload, loading: false };
    case LOGOUT_USER:
      return { ...state, currentUserById: undefined, authToken: undefined };

    case FETCH_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, currentUserId: payload.data.id };
    case FETCH_CURRENT_USER_ERROR:
      return {
        ...state,
        currentUserById: undefined,
        authToken: undefined,
        loading: false
      };

    default:
      return state;
  }
}
