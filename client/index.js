import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import store from './store';
import Home from './components/Home';
import Login from './components/Login';

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={hashLinkScroll}>
      <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />

      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
