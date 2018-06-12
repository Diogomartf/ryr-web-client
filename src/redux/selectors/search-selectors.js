import { createSelector } from 'reselect';

const getVehiclesById = state => state.vehicles.byId;
const getVehicleTypesById = state => state.vehicleTypes.byId;
const getUsersById = state => state.users.byId;
const getSearchResults = state => state.search.results;
const getVehicleFeatureValuesById = state => state.vehicleFeatureValues.byId;
const getFeaturesById = state => state.features.byId;

export const getSearchVehicles = createSelector(
  [
    getSearchResults,
    getVehiclesById,
    getVehicleTypesById,
    getUsersById,
    getVehicleFeatureValuesById,
    getFeaturesById
  ],
  (
    results,
    vehiclesById,
    vehicleTypesById,
    usersById,
    vehicleFeatureValues,
    featuresById
  ) =>
    results.map(id => {
      const v = { ...vehiclesById[id] };
      v.vehicle_type = vehicleTypesById[v.vehicle_type_id];
      v.user = usersById[v.user_id];
      v.features = (v.vehicle_feature_value_ids || []).map(vfv_id => ({
        ...featuresById[vehicleFeatureValues[vfv_id].feature_id],
        value: vehicleFeatureValues[vfv_id].value
      }));
      return v;
    })
);
