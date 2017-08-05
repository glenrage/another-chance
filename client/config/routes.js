import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import Main from '../components/Main';
import Home from '../components/Home/Home';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <Route path='home' component={Home}/>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

//
// function hashLinkScroll() {
//   const { hash } = window.location;
//   if (hash !== '') {
//     setTimeout(() => {
//       const id = hash.replace('#', '');
//       const element = document.getElementById(id);
//       if (element) element.scrollIntoView();
//     }, 0);
//   }
// }

export default routes;
