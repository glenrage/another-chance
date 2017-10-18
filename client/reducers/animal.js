export default (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ANIMAL':
      return { ...state, redirectTo: '/animals' };
    case 'ANIMAL_PAGE_LOADED':
      return {
        ...state,
        animals: action.payload.animals,
        searchTerm: ''
        // searchSubmit: ''
      };
      break;
    case 'ANIMAL_PAGE_UNLOADED':
      return {};
    case 'UPDATE_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.value
      };
    case 'SEARCH_SUBMIT':
      return {
        ...state,
        searchTerm: action.value
      };
  }
  return state;
};
