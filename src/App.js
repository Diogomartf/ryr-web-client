import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Navbar from './containers/Navbar';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Search from './containers/Search';
import Vehicle from './containers/Vehicle';
import Checkout from './containers/Checkout';
import AccountSettings from './containers/AccountSettings';
import EditProfile from './containers/EditProfile';
import AppBaseStyles from './styles/AppBaseStyles';
import UserProfile from './containers/UserProfile';
import VehicleCreateSteps from './containers/VehicleCreateSteps';
import Rental from './containers/Rental';

class App extends Component {
  render() {
    return (
      <AppBaseStyles>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/vehicles/:id" component={Vehicle} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/users/settings" component={AccountSettings} />
          <PrivateRoute exact path="/users/edit" component={EditProfile} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/vehicle/create" component={VehicleCreateSteps} />
          <PrivateRoute exact path="/rentals/:id" component={Rental} />
        </Switch>
      </AppBaseStyles>
    );
  }
}

export default withRouter(App);
