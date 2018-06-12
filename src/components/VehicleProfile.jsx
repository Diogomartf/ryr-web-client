import React from 'react';
import { Section, SectionTitle } from './ui';
import Features from './Vehicle/Features';
import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';

const displayDescription = description => {
  if (description !== null) {
    return description;
  } else {
    return "This vehicle doesn't have description yet!";
  }
};

const VehicleProfile = ({ vehicle }) => {
  return (
    <div>
      <Section>
        <SectionTitle>Description</SectionTitle>
        {displayDescription(vehicle.description)}
      </Section>

      <Section>
        <SectionTitle>Features</SectionTitle>
        <Features featureSize={1 / 4} features={vehicle.features} />
      </Section>

      <Section>
        <SectionTitle>Location</SectionTitle>
        <MapWithAMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          lat={vehicle.lat}
          lng={vehicle.lng}
        />
      </Section>
    </div>
  );
};

const MapWithAMarker = withGoogleMap(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.lat * 1, lng: props.lng * 1 }}>
    <Circle
      center={{ lat: props.lat * 1, lng: props.lng * 1 }}
      radius={350}
      options={{
        strokeColor: '#babfc7',
        fillColor: '#7d899e'
      }}
    />
  </GoogleMap>
));

export default VehicleProfile;
