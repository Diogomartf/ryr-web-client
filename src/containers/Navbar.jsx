import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink as RebassNavLink } from 'rebass';
import { bindActionCreators } from 'redux';
import { ButtonOutline } from '../components/ui/';

import { logoutUser, fetchCurrentUser } from '../redux/actions/auth-actions';
import { selectCurrentUser } from '../redux/selectors/user-selectors';

import Container from '../components/ui/Container';

class Navbar extends Component {
  fetchUserInfo = props => {
    if (this.props.authToken && !this.props.currentUser) {
      this.props.fetchCurrentUser();
    }
  };

  componentWillMount() {
    this.fetchUserInfo();
  }

  componentDidUpdate(newProps, newState) {
    if (newProps.authToken !== this.props.authToken) {
      this.fetchUserInfo();
    }
  }

  renderUserActions = () => {
    if (this.props.authToken) {
      const currentUser = this.props.currentUser;

      return (
        <Fragment>
          <NavItem
            is={NavLink}
            to="/vehicle/create"
            title="List Your Vehicle"
            activeStyle={{ display: 'none' }}
          >
            <ButtonOutline children="List Your Vehicle" />
          </NavItem>

          <NavItem
            is={NavLink}
            to="/users/settings"
            title="Account Settings"
            activeStyle={{ fontWeight: 'bold' }}
          >
            {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : '...'}
          </NavItem>
          <NavItem onClick={this.props.logoutUser} title="Logout">
            Logout
          </NavItem>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <NavItem is={NavLink} to="/login" activeStyle={{ fontWeight: 'bold' }}>
            Log in
          </NavItem>
          <NavItem is={NavLink} to="/signup" activeStyle={{ fontWeight: 'bold' }}>
            Sign up
          </NavItem>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Nav>
        <NavContainer>
          <Logo is={NavLink} to="/">
            RyR
          </Logo>
          <NavLinks>
            <NavItem is={NavLink} to="/search" activeStyle={{ fontWeight: 'bold' }}>
              Search
            </NavItem>
            {this.renderUserActions()}
          </NavLinks>
        </NavContainer>
      </Nav>
    );
  }
}

const mapStateToProps = reduxState => ({
  authToken: reduxState.auth.authToken,
  currentUser: selectCurrentUser(reduxState)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCurrentUser,
      logoutUser
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

const Nav = styled.nav`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.gray[4]};
  background-color: white;
  color: ${props => props.theme.elements.text.color};
`;

const NavContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const Logo = RebassNavLink.extend`
  margin: 10px 0 10px 0;
  font-size: 30px;
`;

const NavLinks = styled.ul`
  margin: 0;
  text-align: right;
`;

const NavItem = RebassNavLink.extend`
  padding: 14px 16px;
  font-weight: 400;
`;
