import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { setAppInitialState } from '../both/app-reducer';
import routes from '../both/routes';
import reducers from '../both/reducers';

// bring in css
import '../scss/site.scss';

// This value is rendered into the DOM by the server
const initialState = window.__INITIAL_STATE;

// set the initial state of the global and app site configuration
setAppInitialState(initialState.appReducer);

const history = createHistory();
const middleware = routerMiddleware(history);

// Create store with the initial state generated by the server
const store = createStore(reducers, initialState, applyMiddleware(middleware));

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReduxAsyncConnect routes={routes} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);