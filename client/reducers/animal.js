export default (state = {}, action) => {
  switch (action.type) {
    case 'ANIMAL_PAGE_LOADED':
      return {
        ...state,
        animals: action.payload.animals
      };
  }

  return state;
};
