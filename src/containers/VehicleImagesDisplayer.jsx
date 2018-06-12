import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getImagesByVehicleId } from '../redux/selectors/vehicle-selectors';

class VehicleImagesDisplayer extends Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '350px',
          background: `transparent url('${this.props.images[0].image_url ||
            ''}') no-repeat center center /cover`
        }}
      />
    );
  }
}

const mapStateToProps = (reduxState, props) => ({
  images: getImagesByVehicleId(reduxState, props)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleImagesDisplayer);
