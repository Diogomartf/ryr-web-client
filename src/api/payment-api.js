import axios from 'axios';

const fetchPaymentAuthorization = () => {
  return axios.get(`/payments/auth`);
};

const createPayment = (rental_id, payment_token) => {
  return axios.post('/payments', {
    payment: {
      rental_id: rental_id,
      payment_token: payment_token
    }
  });
};

export default { fetchPaymentAuthorization, createPayment };
