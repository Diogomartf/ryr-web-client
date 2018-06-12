import axios from 'axios';

const getAll = () => axios.get('/rentals');
const fetchRental = id => axios.get(`/rentals/${id}`);

const createRental = (from, to, vehicle, user) => {
  return axios.post('/rentals', {
    rental: {
      start_date: from,
      end_date: to,
      vehicle_id: vehicle.id,
      user_id: user.id
    }
  });
};

export default { getAll, fetchRental, createRental };
