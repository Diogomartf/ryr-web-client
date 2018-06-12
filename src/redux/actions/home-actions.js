import HomeAPI from '../../api/home-api';
import { SAVE } from '../middlewares/saveMiddleware';

export const FETCH_HOME_REQUEST = 'FETCH_HOME_REQUEST';
export const FETCH_HOME_SUCCESS = 'FETCH_HOME_SUCCESS';
export const FETCH_HOME_ERROR = 'FETCH_HOME_ERROR';

export const getHomeElements = () => dispatch => {
  dispatch({
    type: FETCH_HOME_REQUEST,
    loading: true
  });

  HomeAPI.get()
    .then(response => {
      dispatch({
        type: SAVE,
        payload: response.data
      });

      dispatch({
        type: FETCH_HOME_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_HOME_ERROR,
        payload: err.response
      });
    });
};
