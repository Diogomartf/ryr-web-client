import { combineReducers } from 'redux';

import { LOGOUT_USER } from '../actions/auth-actions';

import auth from './auth-reducer';
import users from './users-reducer';
import search from './search-reducer';
import billingInfo from './billingInfo-reducer';
import vehicles from './vehicles-reducer';
import vehicleTypes from './vehicle-type-reducer';
import features from './features-reducer';
import currentRental from './current-rental-reducer';
import vehicleTypeFeatures from './vehicle-type-features-reducer';
import vehicleFeatureValues from './vehicle-feature-values-reducer';
import payment from './payment-reducer';
import images from './images-reducer';
import rental from './rental-reducer';
import home from './home-reducer';

const appReducer = combineReducers({
  auth,
  users,
  search,
  vehicles,
  vehicleTypes,
  vehicleTypeFeatures,
  vehicleFeatureValues,
  features,
  billingInfo,
  payment,
  images,
  currentRental,
  rental,
  home
});

const rootReducer = (state, action) => {
  if (LOGOUT_USER === action.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
