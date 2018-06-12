import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';

import { loginUser } from '../redux/actions/auth-actions';

import { Card } from '../components/ui/Cards';
import { Input } from '../components/ui/Forms';
import { ButtonLoader as Button } from '../components/ui/Buttons';
import { SectionTitle, SmallText } from '../components/ui/Typography';
import { Alert } from '../components/ui/Alerts';
import { Link } from '../components/ui/Link';
import { Row } from '../components/ui/Row';
import { Column } from '../components/ui/Column';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { MiniPage } from '../components/ui/MiniPage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  invalid = () => !this.state.email || !this.state.password;

  renderError() {
    if (this.state.error) {
      return <Alert.error>Incorrect Email or Password</Alert.error>;
    }
  }

  login = evt => {
    evt.preventDefault();
    this.props
      .loginUser(this.state.email, this.state.password)
      .then(success => this.setState({ error: !success }));
  };

  render() {
    if (this.props.auth.authToken) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }

    return (
      <MiniPage>
        <Card px={3} py={4}>
          <Container>
            <SectionTitle align="center">Welcome Back</SectionTitle>
            <Row>
              <Column py={2}>
                <SmallText align="center">
                  New to Rent Your Ride?{' '}
                  <Link is={RouterLink} secondary="true" to="/signup">
                    Create an account
                  </Link>
                </SmallText>
              </Column>
            </Row>

            <Section>
              <form onSubmit={this.login}>
                <Section>
                  <Input
                    border="true"
                    py={2}
                    type="email"
                    placeholder="Email"
                    label="Email"
                    onChange={this.onEmailChange}
                  />

                  <Input
                    border="true"
                    py={2}
                    type="password"
                    label="Password"
                    linktext="Forgot your password?"
                    link="/"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                </Section>

                {this.renderError()}
                <Button
                  type="submit"
                  disabled={this.invalid()}
                  loading={this.props.auth.loading}
                >
                  Log in
                </Button>
              </form>
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
      loginUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
