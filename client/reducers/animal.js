export default (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_ANIMAL':
      return { ...state, redirectTo: '/animals' };
    case 'ANIMAL_PAGE_LOADED':
      return {
        ...state,
        // animal: action.payload[0].animal,
        animals: action.payload.animals
      };
      break;
    case 'ANIMAL_PAGE_UNLOADED':
      return {};
    case 'UPDATE_SEARCH_TERM':
      return {
        ...state,

        searchTerm: action.value
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
      
        searchInput: action.value
      };
  }
  return state;
};
