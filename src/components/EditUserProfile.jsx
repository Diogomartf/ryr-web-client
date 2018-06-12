import React, { Component } from 'react';

import Section from './ui/Section';
import Row from '../components/ui/Row';
import Column from '../components/ui/Column';
import Container from '../components/ui/Container';
import { Input, TextArea } from '../components/ui/Forms';
import { NoteText, SectionTitle } from '../components/ui/Typography';
import { Button } from './ui/Buttons';
import Modal from '../components/ui/Modal';
import Link from '../components/ui/Link';

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    const data = props.user;

    this.state = {
      first_name: data.first_name,
      middle_names: data.middle_names,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      description: data.description,
      password: '',
      password_confirmation: ''
    };
  }

  componentWillMount() {
    this.setState({ isShowingConfirmationPwModal: false, changedInput: false });

    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTextAreaChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleSensitiveInputChange = event => {
    this.setState({ changedInput: true, [event.target.name]: event.target.value });
  };

  handleOpenModal = () => {
    this.setState({ isShowingConfirmationPwModal: true });
  };

  handleCloseModal = () => {
    this.setState({ isShowingConfirmationPwModal: false });
  };

  submit = () => {
    if (this.state.password === this.state.password_confirmation)
      this.props.onSubmit(this.state);
  };

  onSave = () => {
    if (this.state.changedInput) this.handleOpenModal();
    else this.submit();
  };

  render() {
    const user = this.props.user;
    return (
      <Section>
        <Row>
          <Column py={3}>
            <Input
              type="text"
              border="true"
              name="first_name"
              label="First Name"
              onChange={this.handleInputChange}
              defaultValue={user.first_name}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Input
              type="text"
              border="true"
              name="middle_names"
              label="Middle Names"
              tooltip="Private"
              onChange={this.handleInputChange}
              defaultValue={user.middle_names}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Input
              type="text"
              border="true"
              name="last_name"
              label="Last Name"
              onChange={this.handleInputChange}
              defaultValue={user.last_name}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Input
              type="text"
              border="true"
              name="phone_number"
              label="Phone Number"
              tooltip="Private"
              onChange={this.handleInputChange}
              defaultValue={user.phone_number}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Input
              type="text"
              border="true"
              name="email"
              label="Email"
              tooltip="Private"
              onChange={this.handleSensitiveInputChange}
              defaultValue={user.email}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Input
              type="password"
              border="true"
              name="password"
              label="Password"
              onChange={this.handleSensitiveInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <TextArea
              rows="4"
              name="description"
              id="description"
              label="Bio"
              onChange={this.handleTextAreaChange}
              defaultValue={user.description}
            />
            <NoteText>
              Rent your Ride is built on relationships. Help other people get to know you.
            </NoteText>
          </Column>
        </Row>

        <Row>
          <Column py={3}>
            <Button width={[1, 1 / 2]} onClick={this.onSave}>
              Save
            </Button>
            {this.state.isShowingConfirmationPwModal &&
              this.state.changedInput && (
                <div>
                  <Modal width={[2 / 3, 1 / 3]}>
                    <Container>
                      <SectionTitle align="center">
                        Confirm Password to continue
                      </SectionTitle>
                      <Section py={2}>
                        <Input
                          type="password"
                          border="true"
                          name="password_confirmation"
                          label="Password"
                          onChange={this.handleInputChange}
                          error={
                            this.state.password_confirmation !== this.state.password
                              ? 'true'
                              : ''
                          }
                          errormessage={'Please enter the same password'}
                        />
                      </Section>
                      <Section py={2}>
                        <NoteText>
                          For your security, please enter your Rent Your Ride password to
                          continue.
                          <Link children=" Forgot password?" />
                        </NoteText>
                      </Section>
                      <Section>
                        <Row>
                          <Column width={[1, 1 / 2]} py={2}>
                            <Button onClick={this.submit}>Confirm</Button>
                          </Column>
                          <Column width={[1, 1 / 2]} py={2}>
                            <Button onClick={this.handleCloseModal}>Cancel</Button>
                          </Column>
                        </Row>
                      </Section>
                    </Container>
                  </Modal>
                </div>
              )}
          </Column>
        </Row>
      </Section>
    );
  }
}

export default EditUserProfile;
