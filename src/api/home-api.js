import axios from 'axios';

const get = () => {
  return axios.get(`/home`);
};

export default { get };
