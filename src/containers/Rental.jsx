import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Page, Sidebar, Body, Row, Title } from '../components/ui';

import { fetchRental } from '../redux/actions/rental-actions';

import { fetchVehicleById } from '../redux/actions/vehicle-actions';
import { selectCurrentUser } from '../redux/selectors/user-selectors';
import {
  getVehicleById,
  getImagesByVehicleId
} from '../redux/selectors/vehicle-selectors';

import RentalCard from '../components/RentalCard';

class Rental extends Component {
  componentDidMount() {
    if ((!this.props.vehicle || !this.props.vehicle.model) && this.props.rental) {
      this.props.fetchVehicleById(this.props.rental.data.attributes.vehicle_id);
    }

    if (!this.props.rental || !this.props.rental.data) {
      this.props.fetchRental(this.props.match.params.id);
    }
  }

  render() {
    const { rental, vehicle } = this.props;

    if (!rental) return null;

    return (
      <Page>
        <form>
          <Title pl={3}>{`Rental #${rental.data.id}`}</Title>
          <Row>
            <Body />
            <Sidebar>
              <RentalCard
                vehicle={vehicle}
                from={rental.data.attributes.start_date}
                to={rental.data.attributes.end_date}
              />
            </Sidebar>
          </Row>
        </form>
      </Page>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  const vehicle_id = reduxState.rental.results
    ? reduxState.rental.results.data.attributes.vehicle_id
    : null;

  const vehicle = getVehicleById(reduxState, {
    id: vehicle_id
  });

  return {
    currentUser: selectCurrentUser(reduxState),
    billingInfo: reduxState.billingInfo,
    payment: reduxState.payment,
    rental: reduxState.rental.results,
    vehicle: {
      ...vehicle,
      images: vehicle ? getImagesByVehicleId(reduxState, { id: vehicle_id }) : [{}]
    }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRental,
      fetchVehicleById
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
