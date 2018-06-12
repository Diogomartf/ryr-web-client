import React from 'react';
import { MediumText } from './ui';
import VehicleCard from './Vehicle/VehicleCard';

const Empty = () => (
  <MediumText p={2} align="center">
    No Vehicles Found
  </MediumText>
);

const VehiclesList = ({ vehicles }) => {
  if (!vehicles.length) return <Empty />;

  return vehicles.map(vehicle => (
    <VehicleCard
      sizeLeft={[1, 5 / 7]}
      sizeRight={[1, 2 / 7]}
      sizeInfoTop={[11 / 15, 1, 1]}
      sizeInfoBottom={[4 / 15, 1, 1]}
      key={vehicle.id}
      id={vehicle.id}
    />
  ));
};

export default VehiclesList;
