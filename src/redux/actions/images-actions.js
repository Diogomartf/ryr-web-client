import VehiclesAPI from '../../api/vehicles-api';

export const POST_IMAGE = 'POST_IMAGE';
export const POST_IMAGE_SUCCESS = 'POST_IMAGE_SUCCESS';
export const POST_IMAGE_ERROR = 'POST_IMAGE_ERROR';

export const postImages = (id, descriptions, files) => dispatch => {
  dispatch({
    type: POST_IMAGE
  });

  VehiclesAPI.postImages(id, descriptions, files)
    .then(response => {
      dispatch({
        type: POST_IMAGE_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: POST_IMAGE_ERROR,
        payload: err.response
      });
    });
};
