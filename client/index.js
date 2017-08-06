import ReactDOM from 'react-dom';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { promiseMiddleware } from './middleware';
import App from './components/App';

const defaultState = {
  appName: 'Otra-Opportunidad',
  animals: null
};

const reducer = function(state = defaultState, action) {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return { ...state, animals: action.payload.animals };
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
