import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import animal from './reducers/animal';
import animalForm from './reducers/animalForm';

const reducer = combineReducers({
  auth,
  animal,
  animalForm,
  common,
  home,
  settings,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
const store = createStore(reducer, composeEnhancers(middleware));

console.log(`Current State :${JSON.stringify(store.getState())}`);

export default store;
