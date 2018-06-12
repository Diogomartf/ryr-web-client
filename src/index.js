import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/custom.css';

import ApiManager from './api/api-manager';
import registerServiceWorker from './registerServiceWorker';
import baseReducer from './redux/reducers/base-reducer';

import saveMiddleware from './redux/middlewares/saveMiddleware';

import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

import App from './App';

const middlewares = [thunk, saveMiddleware];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const allStoreEnhencers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(baseReducer, allStoreEnhencers);

ApiManager.init(store);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
