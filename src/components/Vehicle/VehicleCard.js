import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getVehicleById,
  getImagesByVehicleId
} from '../../redux/selectors/vehicle-selectors';
import { getFeaturesByVehicleId } from '../../redux/selectors/features-selectors';

import { Flex, Box } from 'rebass';

import SlideShow from '../Slideshow/SlideShow';
import Info from './Info';

class VehicleCard extends Component {
  render() {
    const vehicle = this.props.vehicle;
    return (
      <Box bg={'cardBg'} mb={4}>
        <Flex flexWrap="wrap">
          <Box width={this.props.sizeLeft}>
            <SlideShow id={this.props.id} images={vehicle.images} />
          </Box>
          <Box px={3} py={1} width={this.props.sizeRight}>
            <Info
              vehicle={vehicle}
              sizeTop={this.props.sizeInfoTop}
              sizeBottom={this.props.sizeInfoBottom}
            />
          </Box>
        </Flex>
      </Box>
    );
  }
}

const mapStateToProps = (reduxState, props) => ({
  vehicle: {
    ...getVehicleById(reduxState, props),
    images: getImagesByVehicleId(reduxState, props),
    features: getFeaturesByVehicleId(reduxState, props)
  }
});

export default connect(mapStateToProps)(VehicleCard);
