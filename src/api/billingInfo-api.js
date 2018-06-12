import axios from 'axios';

const createBillingInfo = (
  user_id,
  street_address,
  city,
  state,
  postal_code,
  country
) => {
  return axios.post(`/billing_infos`, {
    user_id,
    street_address,
    city,
    state,
    postal_code,
    country
  });
};

const fetchBillingInfo = () => {
  return axios.get(`/billing-infos/profile`);
};

export default { createBillingInfo, fetchBillingInfo };
