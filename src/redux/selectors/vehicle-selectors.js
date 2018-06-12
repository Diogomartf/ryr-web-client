import { createSelector } from 'reselect';

const getVehicle = (state, props) => state.vehicles.byId[props.id];
const getVehicleTypesIndexedById = state => state.vehicleTypes.byId;
const getUsersIndexedById = state => state.users.byId;
const getVehicleFeatureValuesById = state => state.vehicleFeatureValues.byId;
const getFeaturesById = state => state.features.byId;
const getImagesById = state => state.images.byId;

export const getVehicleById = createSelector(
  [
    getVehicle,
    getVehicleTypesIndexedById,
    getUsersIndexedById,
    getVehicleFeatureValuesById,
    getFeaturesById
  ],
  (
    vehicle,
    vehicleTypesIndexedById,
    usersIndexedById,
    vehicleFeatureValues,
    featuresById
  ) => {
    var v = undefined;
    if (vehicle) {
      v = {
        ...vehicle,
        vehicle_type: vehicleTypesIndexedById[vehicle.vehicle_type_id],
        user: usersIndexedById[vehicle.user_id],
        loading: false
      };
    }
    return v;
  }
);

export const getImagesByVehicleId = createSelector(
  [getVehicle, getImagesById],
  (vehicle, imagesById) => vehicle.images_ids.map(imageId => imagesById[imageId])
);
