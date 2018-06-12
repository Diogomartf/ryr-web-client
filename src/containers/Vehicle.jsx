import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

import { fetchVehicleById } from '../redux/actions/vehicle-actions';
import { getVehicleById } from '../redux/selectors/vehicle-selectors';
import { getFeaturesByVehicleId } from '../redux/selectors/features-selectors';
import { createRental } from '../redux/actions/rental-actions';

import { Row, Title, SmallText, Page, Body, Sidebar, Section } from '../components/ui';

import Loading from '../components/ui/Loading';

import RentCard from '../components/RentCard';
import VehicleProfile from '../components/VehicleProfile';
import VehicleImagesDisplayer from './VehicleImagesDisplayer';
import UserCard from '../components/UserCard';

class Vehicle extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchVehicleById(this.props.match.params.id);
  }

  render() {
    const vehicle = this.props.vehicle;
    if (vehicle.loading) {
      return (
        <Page>
          <Title />
          <SmallText>Location</SmallText>

          <Row>
            <Body>
              <Loading />
            </Body>

            <Sidebar>
              <Loading />
            </Sidebar>
          </Row>
        </Page>
      );
    } else {
      if (!vehicle || vehicle.loading === false)
        return (
          <div>
            <VehicleImagesDisplayer id={vehicle.id} />
            <Page>
              <Title>
                {vehicle.brand} {vehicle.model}
              </Title>
              <SmallText>Location</SmallText>

              <Row>
                <Body>
                  <VehicleProfile vehicle={vehicle} />
                </Body>

                <Sidebar>
                  <Section>
                    <RentCard
                      vehicle={vehicle}
                      currentRental={this.props.currentRental}
                      createRental={this.props.createRental}
                      currentUser={this.props.currentUser}
                    />
                  </Section>
                  <Section>
                    <UserCard user={vehicle.user} />
                  </Section>
                </Sidebar>
              </Row>
            </Page>
          </div>
        );
      else return <Loading />;
    }
  }
}

const mapStateToProps = (reduxState, props) => {
  const vehicle = getVehicleById(reduxState, props.match.params);
  return {
    vehicle: {
      ...vehicle,
      features: vehicle ? getFeaturesByVehicleId(reduxState, props.match.params) : []
    },
    currentRental: reduxState.currentRental,
    currentUser: selectCurrentUser(reduxState)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchVehicleById,
      createRental
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
