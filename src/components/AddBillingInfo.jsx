import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Section, Row, Column, Input, Select } from './ui';

class AddBillingInfo extends Component {
  handleSelectChange = (name, value) => {
    this.setState({ name: value });
  };

  render() {
    return (
      <div>
        <Section>
          <Row>
            <Column py={2}>
              <Input
                type="text"
                border="true"
                label="Street Address"
                name="streetAddress"
                value={this.props.billingInfo.streetAddress}
                onChange={this.props.onChange}
              />
            </Column>
          </Row>

          <Row>
            <Column py={2} width={[1, 1 / 2]}>
              <Input
                type="text"
                border="true"
                label="City"
                name="city"
                value={this.props.billingInfo.city}
                onChange={this.props.onChange}
              />
            </Column>

            <Column py={2} width={[1, 1 / 2]}>
              <Input
                type="text"
                border="true"
                label="State/Region"
                name="state"
                value={this.props.billingInfo.state}
                onChange={this.props.onChange}
              />
            </Column>
          </Row>

          <Row>
            <Column py={2} width={[1, 1 / 2]}>
              <Input
                type="text"
                border="true"
                label="Postal Code"
                name="postalCode"
                value={this.props.billingInfo.postalCode}
                onChange={this.props.onChange}
              />
            </Column>

            <Column py={2} width={[1, 1 / 2]}>
              <Select
                label="Country"
                name="country"
                onChange={this.props.onChange}
                value={this.props.billingInfo.country}
                clearable={false}
                options={[
                  { name: 'country', value: 'Portugal', label: 'Portugal' },
                  { name: 'country', value: 'Spain', label: 'Spain' },
                  { name: 'country', value: 'Italy', label: 'Italy' },
                  { name: 'country', value: 'USA', label: 'USA' }
                ]}
              />
            </Column>
          </Row>
        </Section>
      </div>
    );
  }
}

AddBillingInfo.propTypes = {
  billingInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AddBillingInfo;
