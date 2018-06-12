import axios from 'axios';

const fetchAll = () => axios.get('/vehicles');
const fetchVehicleById = id => axios.get(`/vehicles/${id}`);
const search = params => axios.get('/vehicles/search', { params });

const postVehicle = stepData => {
  let vehicle = {
    ...stepData[0],
    ...stepData[3],
    description: stepData[1]['description']
  };
  let formData = new FormData();
  formData = appendValuesToFormData(vehicle, formData, 'vehicle');
  formData = appendValuesToFormData(stepData[1]['features'], formData, 'features');
  formData = appendImagesToFormData(
    stepData[2]['photos']['descriptions'],
    stepData[2]['photos']['files'],
    formData
  );
  return axios.post(`/vehicles/`, formData);
};

const postImages = (id, descriptions, files) => {
  let formData = new FormData();
  formData = appendImagesToFormData(descriptions, files, formData);
  return axios.post(`/vehicles/${id}/images`, formData);
};

const appendValuesToFormData = (data, formData, field) => {
  Object.keys(data).forEach(key => {
    const name = field + '[' + key + ']';
    formData.append(name, data[key]);
  });
  return formData;
};

const appendImagesToFormData = (descriptions, files, formData) => {
  files.forEach((file, index) => {
    formData.append('images[files][]', file);
    formData.append('images[descriptions][]', descriptions[index]);
  });
  return formData;
};

export default { fetchAll, fetchVehicleById, search, postVehicle, postImages };
