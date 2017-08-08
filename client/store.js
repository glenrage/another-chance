import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import animal from './reducers/animal';

const reducer = combineReducers({
  auth,
  common,
  home,
  settings,
  animal
});


const middleware =  applyMiddleware(promiseMiddleware, localStorageMiddleware);
const store = createStore(reducer, middleware)

console.log('Current State :' + JSON.stringify(store.getState()))

export default store;
