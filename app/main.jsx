import 'react-select/dist/react-select.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import { initApp } from './api/actions';

const store = configureStore();
store.dispatch(initApp());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
