import axios from 'axios';

import { LOGOUT_USER } from '../redux/actions/auth-actions';

let BASE_URL = '';

if (process.env.NODE_ENV === 'production') {
  BASE_URL = process.env.REACT_APP_API_HOST;
} else {
  BASE_URL = 'http://localhost:3000';
}

export const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

const init = store => {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const localAuthToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (localAuthToken !== null) {
    setAuthToken(localAuthToken);
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        store.dispatch({ type: LOGOUT_USER });
        removeAuthToken();
      }

      return Promise.reject(error);
    }
  );
};

const setAuthToken = authToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken);
};

const removeAuthToken = () => {
  axios.defaults.headers.common['Authorization'] = null;
  localStorage.clear();
};

export default { init, setAuthToken, removeAuthToken };
