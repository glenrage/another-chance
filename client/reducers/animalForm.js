export default (state ={}, action) => {
  switch (action.type) {
    case 'ANIMALFORM_LOADED':
      return {
        ...state,
        animalSlug: action.payload ? action.payload.animal.slug : '',
        name: action.payload ? action.payload.animal.name : '',
        type: action.payload ? action.payload.animal.type : '',
        breed: action.payload ? action.payload.animal.breed : '',
        weight: action.payload ? action.payload.animal.weight : '',
        age: action.payload ? action.payload.animal.age : '',
        bloodType: action.payload ? action.payload.animal.bloodType : '',
        contactName: action.payload ? action.payload.animal.contactName : '',
        contactNumber: action.payload ? action.payload.animal.contactNumber : '',
        vetName: action.payload ? action.payload.animal.vetName : '',
        location: action.payload ? action.payload.animal.location : '',
      }
    case 'ANIMALFORM_UNLOADED':
      return {};
    case 'ANIMALFORM_SUBMITTED':
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      if (action.subtype === 'ANIMALFORM_SUBMITTED') {
        return { ...state, inProgress: true };
      }
      break;
    case 'UPDATE_FIELD_ANIMALFORM':
      return { ...state, [action.key]: action.value };
  }

  return state;
}
