import PaymentAPI from '../../api/payment-api';

export const FETCH_PAYMENT_REQUEST = 'FETCH_PAYMENT_REQUEST';
export const FETCH_PAYMENT_SUCCESS = 'FETCH_PAYMENT_SUCCESS';
export const FETCH_PAYMENT_ERROR = 'FETCH_PAYMENT_ERROR';

export const CREATE_PAYMENT_REQUEST = 'CREATE_PAYMENT_REQUEST';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_ERROR = 'CREATE_PAYMENT_ERROR';

export const fetchPaymentAuthorization = () => dispatch => {
  dispatch({
    type: FETCH_PAYMENT_REQUEST,
    loading: true
  });

  PaymentAPI.fetchPaymentAuthorization()
    .then(response => {
      dispatch({
        type: FETCH_PAYMENT_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_PAYMENT_ERROR,
        payload: err.response
      });
      return false;
    });
};

export const createPayment = (rental_id, payment_token) => dispatch => {
  dispatch({
    type: CREATE_PAYMENT_REQUEST,
    loading: true
  });

  PaymentAPI.createPayment(rental_id, payment_token)
    .then(response => {
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_PAYMENT_ERROR,
        payload: err.response
      });
      return false;
    });
};
