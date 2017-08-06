import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import App from '../components';
import Home from '../components/Home';
import Auth from '../components/Auth/Auth'

const routes = (
  <Router history={browserHistory} onUpdate={hashLinkScroll}>
    <Route path='/' component={App}>
      <Route path='home' component={Home}/>
      <Route path='auth' component={Auth} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

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

export default routes;
