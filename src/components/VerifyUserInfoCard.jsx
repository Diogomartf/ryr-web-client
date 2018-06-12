import React, { Component } from 'react';
import { Card } from './ui/Cards';
import Divider from './ui/Dividers';
import Container from './ui/Container';
import Section from './ui/Section';
import Row from './ui/Row';
import Column from './ui/Column';
import { NoteText, MediumText, Title } from './ui/Typography';
import { Input } from './ui/Forms';
import Link from './ui/Link';
import Button from './ui/Buttons';
import Modal from './ui/Modal';

class VerifyUserInfoCard extends Component {
  componentWillMount() {
    this.setState({ isShowingModal: false, isShowingConfirmationModal: false });

    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOpenModal = () => {
    this.setState({ isShowingModal: true });
  };

  handleOpenConfirmationModal = () => {
    this.setState({ isShowingModal: false, isShowingConfirmationModal: true });
  };

  handleCloseModal = () => {
    this.setState({ isShowingModal: false });
  };

  handleCloseConfirmationModal = () => {
    this.setState({ isShowingConfirmationModal: false });
  };

  render() {
    return (
      <Section>
        <Card px={3} py={3}>
          <Container>
            <Section>
              <Row py={2}>
                <Column>
                  <MediumText>Email</MediumText>
                </Column>
                <Column>
                  <MediumText align="right">
                    <Link secondary="true" children="Confirmed" />
                  </MediumText>
                </Column>
              </Row>

              <Row py={2}>
                <Column>
                  <MediumText>Facebook</MediumText>
                </Column>
                <Column>
                  <MediumText align="right">
                    <Link secondary="true" children="Disconnect" />
                  </MediumText>
                </Column>
              </Row>
            </Section>

            <Divider />

            <Section>
              <MediumText fontWeight="bold">Not verified yet</MediumText>
              <Row py={2}>
                <Column>
                  <MediumText>Phone</MediumText>
                </Column>

                <Column>
                  <MediumText align="right">
                    <Link secondary="true" onClick={this.handleOpenModal}>
                      Verify
                    </Link>
                  </MediumText>
                  {this.state.isShowingModal && (
                    <Modal width={[2 / 3, 1 / 3]}>
                      <Container>
                        <Section>
                          <Title align="left">Change Phone number</Title>
                          <MediumText>
                            We'll send you a text message with a code to verify your
                            number.
                          </MediumText>
                        </Section>
                        <Section>
                          <Input
                            type="text"
                            border="true"
                            name="phoneNumber"
                            label="Phone Number"
                            onChange={this.handleInputChange}
                          />
                          <NoteText pt={1}>
                            We’ll only share your number with your host or guest after
                            you’ve booked a trip.
                          </NoteText>
                        </Section>

                        <Section>
                          <Row>
                            <Column width={[1, 1 / 2]} py={2}>
                              <Button onClick={this.handleOpenConfirmationModal}>
                                Confirm
                              </Button>
                            </Column>
                            <Column width={[1, 1 / 2]} py={2}>
                              <Button onClick={this.handleCloseModal}>Cancel</Button>
                            </Column>
                          </Row>
                        </Section>
                      </Container>
                    </Modal>
                  )}

                  {this.state.isShowingConfirmationModal && (
                    <Modal width={[2 / 3, 1 / 3]}>
                      <Container>
                        <Section>
                          <Title align="left" py={2}>
                            Insert Code
                          </Title>

                          <MediumText>
                            We sent a text with a code to +351 910000000.{' '}
                            <Link>Didn't receive?</Link>
                          </MediumText>
                        </Section>
                        <Section>
                          <Input
                            type="text"
                            border="true"
                            name="code"
                            label="Code"
                            onChange={this.handleInputChange}
                          />
                        </Section>

                        <Section>
                          <Row>
                            <Column width={[1, 1 / 2]} py={2}>
                              <Button onClick={this.handleCloseConfirmationModal}>
                                Confirm
                              </Button>
                            </Column>
                            <Column width={[1, 1 / 2]} py={2}>
                              <Button onClick={this.handleCloseConfirmationModal}>
                                Cancel
                              </Button>
                            </Column>
                          </Row>
                        </Section>
                      </Container>
                    </Modal>
                  )}
                </Column>
              </Row>
            </Section>
          </Container>
        </Card>
      </Section>
    );
  }
}

export default VerifyUserInfoCard;
