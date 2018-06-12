import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createBillingInfo,
  fetchBillingInfo
} from '../redux/actions/billingInfo-actions';
import { fetchPaymentAuthorization } from '../redux/actions/payment-actions';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

import {
  Container,
  Page,
  Sidebar,
  Body,
  Title,
  Row,
  Divider,
  Accordion,
  Column,
  Button,
  MediumText,
  Link
} from '../components/ui';

import { Link as RouterLink } from 'react-router-dom';

import VerifyUserInfoCard from '../components/VerifyUserInfoCard';
import BillingInfo from '../components/BillingInfo';
import AddBillingInfo from '../components/AddBillingInfo';
import BraintreeDropIn from '../components/BraintreeDropIn';
import AddLicense from '../components/AddLicense';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      radio: false,
      paymentToken: null,
      hasPayment: true,
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
    this.props.fetchPaymentAuthorization();
    this.props.fetchBillingInfo();
  }

  setPaymentToken = token => this.setState({ paymentToken: token });

  handleBillingInfoInputChange = event => {
    const target = event.target ? event.target : event;

    this.setState({
      billingInfo: {
        ...this.state.billingInfo,
        [target.name]: target.value
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

  setHasPayment = hasPayment => this.setState({ hasPayment: hasPayment });

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

  renderBraintreeDropIn = () => {
    if (this.props.payment.results && this.state.hasPayment) {
      return (
        <Accordion
          title="Payment"
          expanded="true"
          link="Confirm"
          body={
            <BraintreeDropIn
              token={this.props.payment.results.token}
              setPaymentToken={this.setPaymentToken}
              setHasPayment={this.setHasPayment}
            />
          }
        />
      );
    }
  };

  render() {
    return (
      <Page>
        <Title>Account Settings</Title>
        <Row>
          <Sidebar width="240px">
            <VerifyUserInfoCard />
            <MediumText align="center" py={2}>
              {this.props.currentUser && (
                <Link
                  secondary="true"
                  is={RouterLink}
                  to={`/users/${this.props.currentUser.id}`}
                >
                  See Profile
                </Link>
              )}
            </MediumText>
          </Sidebar>
          <Body>
            <Container>
              <Accordion title="License" link="Add" body={<AddLicense />} />

              <Divider />

              {this.renderBillingInfo()}

              <Divider />

              {this.renderBraintreeDropIn()}
            </Container>
          </Body>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = reduxState => ({
  currentUser: selectCurrentUser(reduxState),
  billingInfo: reduxState.billingInfo,
  payment: reduxState.payment
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBillingInfo,
      fetchBillingInfo,
      fetchPaymentAuthorization
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
