import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'qs';

import {
  Page,
  Sidebar,
  Body,
  Row,
  Title,
  Column,
  Button,
  Accordion,
  Container,
  Divider,
  SmallText,
  Link,
  Section
} from '../components/ui';

import { fetchVehicleById } from '../redux/actions/vehicle-actions';
import {
  fetchPaymentAuthorization,
  createPayment
} from '../redux/actions/payment-actions';

import {
  createBillingInfo,
  fetchBillingInfo
} from '../redux/actions/billingInfo-actions';
import { selectCurrentUser } from '../redux/selectors/user-selectors';
import {
  getVehicleById,
  getImagesByVehicleId
} from '../redux/selectors/vehicle-selectors';

import AddBillingInfo from '../components/AddBillingInfo';
import AddLicense from '../components/AddLicense';
import BillingInfo from '../components/BillingInfo';
import BraintreeDropIn from '../components/BraintreeDropIn';
import CheckoutCard from '../components/CheckoutCard';

class Checkout extends Component {
  constructor(props) {
    super(props);
    const urlParams = queryString.parse(props.location.search.slice(1));

    this.state = {
      error: false,
      to: urlParams.to,
      from: urlParams.from,
      vehicle: urlParams.vehicle,
      paymentToken: null,
      billingInfo: {
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Portugal'
      }
    };
  }

  componentDidMount() {
    this.props.fetchBillingInfo();
    this.props.fetchPaymentAuthorization();

    if (!this.props.vehicle || !this.props.vehicle.model) {
      this.props.fetchVehicleById(this.state.vehicle);
    }
  }

  handleBillingInfoInputChange = event => {
    const target = event.target ? event.target : event;

    this.setState({
      billingInfo: {
        ...this.state.billingInfo,
        [target.name]: target.value
      }
    });
  };

  handlePaymentInfoInputChange = event => {
    this.setState({
      paymentInfo: {
        ...this.state.paymentInfo,
        [event.target.name]: event.target.value
      }
    });
  };

  createBillingInfo = e => {
    if (e) e.preventDefault();
    const { billingInfo } = this.state;

    this.props
      .createBillingInfo(
        this.props.currentUser.id,
        billingInfo.streetAddress,
        billingInfo.city,
        billingInfo.state,
        billingInfo.postalCode,
        billingInfo.country
      )
      .then(success => this.setState({ error: !success }));
  };

  setPaymentToken = token => this.setState({ paymentToken: token });

  renderBraintreeDropIn = () => {
    if (this.props.payment.results) {
      return (
        <div>
          <Accordion
            title="Payment"
            expanded="true"
            link="Confirm"
            body={
              <BraintreeDropIn
                token={this.props.payment.results.token}
                setPaymentToken={this.setPaymentToken}
                setHasPayment={false}
              />
            }
          />
          <Divider />
        </div>
      );
    }
  };

  renderBillingInfo = () =>
    this.props.billingInfo.results ? (
      <Accordion
        title="Billing Info"
        expanded="true"
        body={
          <BillingInfo
            billingInfo={this.props.billingInfo.results.attributes}
            newBillingInfo={this.state.billingInfo}
            onChange={this.handleBillingInfoInputChange}
            onClick={this.createBillingInfo}
          />
        }
      />
    ) : (
      <Accordion
        title="Billing Info"
        link="Add"
        body={
          <div>
            <AddBillingInfo
              billingInfo={this.state.billingInfo}
              onChange={this.handleBillingInfoInputChange}
              onClick={this.createBillingInfo}
            />
            <Row>
              <Column py={2}>
                <Button width={[1, 1 / 2]} onClick={this.createBillingInfo}>
                  Add Billing
                </Button>
              </Column>
            </Row>
          </div>
        }
      />
    );

  completeInfo = () => {
    return this.props.billingInfo.results && this.state.paymentToken;
  };

  handleSubmit = event => {
    const { createPayment, rental, history } = this.props;
    event.preventDefault();
    createPayment(rental.results.data.id, this.state.paymentToken);
    history.push(`rentals/${rental.results.data.id}`);
  };

  render() {
    const from = new Date(this.state.from * 1);
    const to = new Date(this.state.to * 1);
    return (
      <Page>
        <form>
          <Title pl={3}>Checkout</Title>
          <Row>
            <Body>
              <Container>
                {this.renderBraintreeDropIn()}

                {this.renderBillingInfo()}

                <Divider />
                <Accordion title="License" link="Add" body={<AddLicense />} />
              </Container>

              <Section pl={3}>
                <Row>
                  <Column py={2}>
                    <SmallText>
                      By clicking in “Rent now” you agree to pay the total shown, to the
                      Rent your Ride{' '}
                      <Link secondary="true" href="/" children="terms of service" /> and{' '}
                      <Link secondary="true" href="/" children="cancellation policy" />
                      , and authorize Rent Your Ride to obtain my auto insurance score.
                    </SmallText>
                  </Column>
                </Row>
                <Row>
                  <Column py={2}>
                    <Button
                      width={[1, 1 / 2]}
                      onClick={this.handleSubmit}
                      disabled={!this.completeInfo()}
                    >
                      Rent Now
                    </Button>
                  </Column>
                </Row>
              </Section>
            </Body>

            <Sidebar>
              <CheckoutCard vehicle={this.props.vehicle} from={from} to={to} />
            </Sidebar>
          </Row>
        </form>
      </Page>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  const parsedProps = queryString.parse(props.location.search);
  const vehicle = getVehicleById(reduxState, { id: parsedProps.vehicle });

  return {
    currentUser: selectCurrentUser(reduxState),
    billingInfo: reduxState.billingInfo,
    payment: reduxState.payment,
    rental: reduxState.rental,
    vehicle: {
      ...vehicle,
      images: vehicle
        ? getImagesByVehicleId(reduxState, { id: parsedProps.vehicle })
        : [{}]
    }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBillingInfo,
      fetchBillingInfo,
      fetchVehicleById,
      fetchPaymentAuthorization,
      createPayment
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
