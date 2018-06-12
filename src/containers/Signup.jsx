import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink } from 'react-router-dom';

import { signUp } from '../redux/actions/auth-actions';

import { SectionTitle, SmallText, Text } from '../components/ui/Typography';
import { Card } from '../components/ui/Cards';
import { Input } from '../components/ui/Forms';
import { ButtonLoader as Button } from '../components/ui/Buttons';
import { Link } from '../components/ui/Link';
import { Row } from '../components/ui/Row';
import { Column } from '../components/ui/Column';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { MiniPage } from '../components/ui/MiniPage';
import { Alert } from '../components/ui/Alerts';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      phone_number: ''
    };
  }

  onFirstNameChange = e => {
    this.setState({ first_name: e.target.value });
  };

  onLastNameChange = e => {
    this.setState({ last_name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onPasswordConfirmationChange = e => {
    this.setState({ password_confirmation: e.target.value });
  };

  onPhoneNumberChange = e => {
    this.setState({ phone_number: e.target.value });
  };

  signup = evt => {
    evt.preventDefault();
    this.props.signUp({ user: this.state }).then(res => {
      if (res) {
        this.props.history.push('/users/settings');
      }
    });
  };

  invalid = () =>
    !this.state.email ||
    !this.state.password ||
    this.state.password !== this.state.password_confirmation ||
    !this.state.first_name ||
    !this.state.last_name;

  renderError() {
    if (this.props.auth.error) {
      return (
        <Alert.error>
          An error has occurred:{' '}
          {Object.keys(this.props.auth.error)
            .map((err, i) => `${err} ${this.props.auth.error[err]}`)
            .join(', ')}
        </Alert.error>
      );
    }
  }

  render() {
    return (
      <MiniPage>
        <Card px={3} py={4}>
          <Container>
            <SectionTitle align={'center'}>Registration</SectionTitle>
            <Section>
              <form onSubmit={this.signup}>
                <Row>
                  <Column py={2} width={[1, 1, 1 / 2]}>
                    <Input
                      border="true"
                      type="text"
                      label="First Name"
                      placeholder="First Name"
                      onChange={this.onFirstNameChange}
                    />
                  </Column>

                  <Column py={2} width={[1, 1, 1 / 2]}>
                    <Input
                      border="true"
                      type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      onChange={this.onLastNameChange}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column py={2}>
                    <SmallText align="center">
                      Enter your name as it appears on your driver's license.
                    </SmallText>
                  </Column>
                </Row>

                <Row>
                  <Column py={2}>
                    <Input
                      border="true"
                      type="text"
                      label="Phone Number"
                      placeholder="Phone Number"
                      onChange={this.onPhoneNumberChange}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column py={2}>
                    <Input
                      border="true"
                      type="email"
                      label="Email"
                      placeholder="Email"
                      onChange={this.onEmailChange}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column py={2}>
                    <Input
                      border="true"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      onChange={this.onPasswordChange}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column py={2}>
                    <Input
                      border="true"
                      type="password"
                      label="Password Confirmation"
                      placeholder="Password Confirmation"
                      onChange={this.onPasswordConfirmationChange}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column>
                    {this.renderError()}

                    <Button
                      type="submit"
                      disabled={this.invalid()}
                      loading={this.props.auth.loading}
                    >
                      Sign up
                    </Button>
                  </Column>
                </Row>
              </form>
            </Section>

            <Section>
              <Row>
                <Column py={2}>
                  <Text align="center">
                    Or sign up with{' '}
                    <Link is={RouterLink} secondary="true" to="/">
                      Google
                    </Link>{' '}
                    or{' '}
                    <Link is={RouterLink} secondary="true" to="/">
                      Facebook
                    </Link>.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text align="center">
                    Already have an account?{' '}
                    <Link is={RouterLink} to="/login">
                      Log in
                    </Link>
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Card>
      </MiniPage>
    );
  }
}

const mapStateToProps = reduxState => ({
  auth: reduxState.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signUp
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
