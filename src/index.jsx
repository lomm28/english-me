import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import history from './utils/history';

import configureStore from './configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE,
);
