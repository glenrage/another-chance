export default (state = {}, action) => {
  switch (action.type) {
    case 'ANIMAL_PAGE_LOADED':
      return {
        ...state,
        // animal: action.payload[0].animal
        animals: action.payload.animals
      };
      break;
    case 'ANIMAL_PAGE_UNLOADED':
      return {};
  }

  return state;
};
