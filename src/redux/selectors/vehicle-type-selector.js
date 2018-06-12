import { createSelector } from 'reselect';

const getVehicleTypesIndexedById = state => state.vehicleTypes.byId;
const getVehicleType = (state, props) => state.vehicleTypes.byId[props.id] || {};
const getFeaturesIndexedById = state => state.features.byId;
const getVehicleTypeFeaturesIndexedById = state => state.vehicleTypeFeatures.byId || {};

export const getVehicleTypes = createSelector(
  [getVehicleTypesIndexedById],
  vehicleTypesIndexedById => Object.values(vehicleTypesIndexedById)
);

export const getVehicleTypeFeatures = createSelector(
  [getVehicleType, getFeaturesIndexedById, getVehicleTypeFeaturesIndexedById],
  (vehicleType, featuresIndexedById, vehicleTypeFeaturesIndexedById) => {
    return (vehicleType.vehicle_type_feature_ids || []).map(vtf_id => {
      const vehicleTypeFeature = vehicleTypeFeaturesIndexedById[vtf_id] || {};
      return {
        pivot: { ...vehicleTypeFeature },
        ...featuresIndexedById[vehicleTypeFeature.feature_id]
      };
    });
  }
);
