import React, { Component } from 'react';
import braintree from 'braintree-web-drop-in';
import BraintreeDropinReact from 'braintree-dropin-react';

import { Row, Column, Button } from '../components/ui';

const renderSubmitButton = ({ onClick, isDisabled }) => {
  return (
    <Row>
      <Column py={2}>
        <Button width={[1, 1 / 2]} onClick={onClick} disabled={isDisabled}>
          Add payment method
        </Button>
      </Column>
    </Row>
  );
};

class BraintreeDropIn extends Component {
  handlePaymentMethod = payload => {
    this.props.setPaymentToken(payload.nonce);
  };

  onCreate = instance => {
    if (this.props.setHasPayment !== false) {
      this.props.setHasPayment(instance._model._paymentMethods.length !== 0);
    }
  };

  onDestroyStart = () => {};

  onDestroyEnd = () => {};

  onError = error => {};

  render() {
    const token = this.props.token;
    return (
      <div>
        <BraintreeDropinReact
          braintree={braintree}
          authorizationToken={token}
          handlePaymentMethod={this.handlePaymentMethod}
          onCreate={this.onCreate}
          onDestroyStart={this.onDestroyStart}
          onDestroyEnd={this.onDestroyEnd}
          onError={this.onError}
          renderSubmitButton={renderSubmitButton}
          paypal={{
            flow: 'vault'
          }}
        />
      </div>
    );
  }
}

export default BraintreeDropIn;
