import axios from 'axios';

const loginUser = (email, password) =>
  axios.post('/login', {
    auth: {
      email,
      password
    }
  });

const editUser = (id, data) => {
  let user = { ...data };
  let formData = new FormData();
  formData = appendValuesToFormData(user, formData);
  return axios.put(`/users/${id}`, formData);
};

const signUp = data => axios.post('/users', data);
const fetchCurrentUser = () => axios.get('/users/current');
const fetchUserById = id => axios.get(`/users/${id}`);

const appendValuesToFormData = (data, formData) => {
  Object.keys(data).forEach(key => {
    const name = 'user[' + key + ']';
    formData.append(name, data[key]);
  });
  return formData;
};

export default { loginUser, editUser, fetchCurrentUser, fetchUserById, signUp };
