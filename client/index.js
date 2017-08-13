import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import store from './store';
import Home from './components/Home';
import  Login from './components/Login';
import  Register from './components/Register';
import Settings from './components/Settings';
import Animal from './components/Animal';
import AnimalForm from './components/Animal/AnimalForm';

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

//Provider makes the store available to all container components in the app without passing it explicitly. Only required to render once.
ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={hashLinkScroll}>
      <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="settings" component={Settings} />
      <Route path="animals" component={Animal} />
      <Route path="animalform" component={AnimalForm} />
      <Route path="animalform/:slug" component={AnimalForm} />


      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
