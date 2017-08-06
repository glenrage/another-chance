//middleware intercepts and transform actions, our case payload is a promise
//middleware is a function of a function of a function
const promiseMiddleWare = store => next => action => {
  //checks if action.payload is a promise
  if(isPromise(action.payload)) {
    //wait for promise to resolve
    action.payload.then(
      //dispatch action after overwriting payload of a promise when successfully resolves
      res => {
        action.payload = res;
        store.dispatch(action);
      },

      //if rejected set actions payload to error
      error => {
        //dispatch transform action
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );
    return;
  }
  //next is how you pass control to next middleware in the chain, if no more middleware, next function will trigger reducer. if action payload is a promise we dont call next, dispatch new action entirely

  next(action);
};

//assume something is a promise if it has a property called then
function isPromise(func) {
  return func && typeof func.then === 'function';
}

export {
  promiseMiddleWare
};
