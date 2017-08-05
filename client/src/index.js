import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const defaultState = { checked: false };
const reducer = function(state = defaultState, action) {
  switch(action.type) {
    case: 'TOGGLE':
      return { ...state, checked: !state.checked };
  }
  return state;
};

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <h1> Hello World</h1>
    );
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
