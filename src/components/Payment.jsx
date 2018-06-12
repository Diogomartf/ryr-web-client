import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Radio, Image, Fixed } from 'rebass';

import AddPaymentInfo from '../components/AddPaymentInfo';

import {
  Section,
  Row,
  Column,
  Border,
  Text,
  Button,
  Modal,
  Container,
  Title
} from './ui';

class Payment extends Component {
  componentWillMount() {
    this.setState({ isShowingPaymentModal: false });

    this.handleOpenPaymentModal = this.handleOpenPaymentModal.bind(this);
  }

  handleOpenPaymentModal = event => {
    event.preventDefault();
    this.setState({ isShowingPaymentModal: true });
  };

  handleClosePaymentModal = () => {
    this.setState({ isShowingPaymentModal: false });
  };

  handleSelectChange = (name, value) => {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
  };

  render() {
    const { paymentInfo, onChange } = this.props;
    return (
      <div>
        <Section>
          <Border>
            <Flex alignItems="center">
              {this.props.radio === false ? null : (
                <Radio ml={3} name="radio" defaultChecked />
              )}

              <Image
                ml={3}
                width="10%"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png"
              />

              <Box ml={3}>
                <Row>
                  <Column py={1}>
                    <Text fontWeight="bold">John Doe</Text>
                  </Column>
                </Row>
                <Row>
                  <Column py={1}>
                    <Text>Card ending in 2345</Text>
                  </Column>
                </Row>
                <Row>
                  <Column py={1}>
                    <Text>Expires 05/18</Text>
                  </Column>
                </Row>
              </Box>
            </Flex>
          </Border>
        </Section>

        <Section>
          <Border className="borderShadow">
            <Button
              background="white"
              color="black"
              fontSize="16px"
              onClick={this.handleOpenPaymentModal}
            >
              <Flex alignItems="center">
                <Text> + </Text>
                <Box ml={3}>Add Payment Info</Box>
              </Flex>
            </Button>
          </Border>
        </Section>

        {this.state.isShowingPaymentModal && (
          <div>
            <Fixed
              top={0}
              right={0}
              bottom={0}
              left={0}
              onClick={this.handleClosePaymentModal}
            />
            <Modal width={[2 / 3, 1 / 2]}>
              <Container>
                <Title align="left" py={2}>
                  Add Payment Info
                </Title>

                <AddPaymentInfo paymentInfo={paymentInfo} onChange={onChange} />

                <Section>
                  <Row>
                    <Column width={[1, 1 / 2]} py={2}>
                      <Button onClick={this.props.onClick}>Add Payment Info</Button>
                    </Column>
                    <Column width={[1, 1 / 2]} py={2}>
                      <Button onClick={this.handleClosePaymentModal}>Cancel</Button>
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

Payment.propTypes = {
  paymentInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Payment;
