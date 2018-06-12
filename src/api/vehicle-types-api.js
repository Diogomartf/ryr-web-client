import axios from 'axios';

const fetchAllVehicleTypes = () => axios.get('/vehicle_types');

export default { fetchAllVehicleTypes };
