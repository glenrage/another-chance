import agent from './agent';

// middleware intercepts and transform actions, our case payload is a promise
// middleware is a function of a function of a function
const promiseMiddleware = store => next => (action) => {
  // assume something is a promise if it has a property called .then
  function isPromise(func) {
    return func && typeof func.then === 'function';
  }
  // checks if action.payload is a promise
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    // wait for promise to resolve
    action.payload.then(
      // dispatch action after overwriting payload of a promise when successfully resolves
      (res) => {
        action.payload = res;
        store.dispatch(action);
      },
      // if rejected set actions payload to error
      (error) => {
        // dispatch transform action
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      },
    );
    return;
  }
  // next is how you pass control to next middleware in the chain,
  // if no more middleware, next function will trigger reducer.
  // if action payload is a promise we dont call next, dispatch new action entirely

  next(action);
};

// eslint-disable-next-line no-unused-vars
const localStorageMiddleware = store => next => (action) => {
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token); // eslint-disable-line no-undef
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', ''); // eslint-disable-line no-undef
    agent.setToken(null);
  }
  next(action);
};

export { localStorageMiddleware, promiseMiddleware };
