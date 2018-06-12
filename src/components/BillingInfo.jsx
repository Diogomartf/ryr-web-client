import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Fixed, Box } from 'rebass';

import AddBillingInfo from '../components/AddBillingInfo';

import {
  Section,
  Row,
  Column,
  Text,
  Modal,
  Button,
  Container,
  Title,
  Link,
  Close
} from './ui';

class BillingInfo extends Component {
  componentWillMount() {
    this.setState({ isShowingBillingModal: false });
  }

  handleOpenBillingModal = event => {
    event.preventDefault();
    this.setState({ isShowingBillingModal: true });
  };

  handleCloseBillingModal = () => {
    this.setState({ isShowingBillingModal: false });
  };

  handleOnClickAddBillingInfo = event => {
    event.preventDefault();
    this.setState({ isShowingBillingModal: false });
    this.props.onClick();
  };

  render() {
    const { billingInfo, onChange } = this.props;
    return (
      <div>
        <Section>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Row>
                <Column py={1}>
                  <Text>{billingInfo.street_address} </Text>
                </Column>
              </Row>

              <Row>
                <Column py={1}>
                  <Text>
                    {billingInfo.state}, {billingInfo.city} - {billingInfo.postal_code}
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column py={1}>
                  <Text>{billingInfo.country}</Text>
                </Column>
              </Row>

              <Row>
                <Column py={2}>
                  <Link onClick={this.handleOpenBillingModal}>Change</Link>
                </Column>
              </Row>
            </Box>
          </Flex>
        </Section>

        {this.state.isShowingBillingModal && (
          <div>
            <Fixed
              top={0}
              right={0}
              bottom={0}
              left={0}
              onClick={this.handleCloseBillingModal}
            />
            <Modal width={[2 / 3, 1 / 2]}>
              <Container>
                <Flex justifyContent="space-between" alignItems="center">
                  <Title align="left" py={2}>
                    Add Billing Info
                  </Title>
                  <Close onClick={this.handleCloseBillingModal} />
                </Flex>

                <AddBillingInfo
                  billingInfo={this.props.newBillingInfo}
                  onChange={onChange}
                />

                <Section>
                  <Row>
                    <Column width={[1, 1 / 2]} py={2}>
                      <Button onClick={this.handleOnClickAddBillingInfo}>
                        Add Billing Info
                      </Button>
                    </Column>
                    <Column width={[1, 1 / 2]} py={2}>
                      <Button onClick={this.handleCloseBillingModal}>Cancel</Button>
                    </Column>
                  </Row>
                </Section>
              </Container>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

BillingInfo.propTypes = {
  billingInfo: PropTypes.object.isRequired
};

export default BillingInfo;
