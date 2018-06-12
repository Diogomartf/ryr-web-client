import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Section, Row, Column, SectionTitle, Input, Select } from './ui';

class AddPaymentInfo extends Component {
  handleSelectChange = (name, value) => {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
  };

  render() {
    return (
      <div>
        <Section>
          <SectionTitle>Payment info</SectionTitle>
          <Row>
            <Column py={2} width={[1, 3 / 4]}>
              <Input
                autoComplete="cc-number"
                type="text"
                border="true"
                name="creditCardNumber"
                label="Credit Card Number"
                value={this.props.paymentInfo.creditCardNumber}
                onChange={this.props.onChange}
              />
            </Column>

            <Column py={2} width={[1, 1 / 4]}>
              <Input
                autoComplete="cc-csc"
                type="text"
                border="true"
                name="creditCardCVC"
                label="Security Code"
                value={this.props.paymentInfo.creditCardCVC}
                onChange={this.props.onChange}
              />
            </Column>
          </Row>

          <Row>
            <Column py={2}>
              <Input
                type="text"
                border="true"
                name="creditCardHolder"
                autoComplete="cc-name"
                label="Holder Name"
                value={this.props.paymentInfo.holderName}
                onChange={this.props.onChange}
              />
            </Column>
          </Row>

          <Row>
            <Column py={2} width={[1, 1 / 2]}>
              <Select
                label="Expiration Month"
                value={this.props.paymentInfo.expirationMonth}
                options={[
                  { value: 1, label: 'January' },
                  { value: 2, label: 'February' },
                  { value: 3, label: 'March' },
                  { value: 4, label: 'April' }
                ]}
                onChange={this.handleSelectChange.bind(this, 'expirationMonth')}
              />
            </Column>

            <Column py={2} width={[1, 1 / 2]}>
              <Select
                label="Expiration Year"
                value={this.props.paymentInfo.expirationYear}
                options={[
                  { value: 1, label: '2018' },
                  { value: 2, label: '2019' },
                  { value: 3, label: '2020' },
                  { value: 4, label: '2021' }
                ]}
                onChange={this.handleSelectChange.bind(this, 'expirationYear')}
              />
            </Column>
          </Row>
        </Section>
      </div>
    );
  }
}

AddPaymentInfo.propTypes = {
  paymentInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AddPaymentInfo;
