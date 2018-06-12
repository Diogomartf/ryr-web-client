import { createSelector } from 'reselect';

const getVehicle = (state, props) => state.vehicles.byId[props.id];
const getVehicleFeatureValuesById = state => state.vehicleFeatureValues.byId;
const getFeaturesById = state => state.features.byId;

export const getFeaturesByVehicleId = createSelector(
  [getVehicle, getVehicleFeatureValuesById, getFeaturesById],
  (vehicle, vehicleFeatureValues, featuresById) => {
    return vehicle.vehicle_feature_value_ids.map(
      vfv_id => featuresById[vehicleFeatureValues[vfv_id].feature_id]
    );
  }
);
