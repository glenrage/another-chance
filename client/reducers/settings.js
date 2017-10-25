export default (state = {}, action) => {
  switch (action.type) {
    case 'SETTINGS_PAGE_LOADED':
      return {
        ...state,
        users: action.payload.users
      };
    case 'SETTINGS_SAVED':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      return {
        ...state,
        inProgres: true
      };
  }
  return state;
};
