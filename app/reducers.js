import { combineReducers } from 'redux';


function dumbReducer(state = {}, action) {
  switch (action.type) {
    case 'ok':
      return { ...state };
    default:
      return state;
  }
}


export default function createApiReducer() {
  return combineReducers({
    dumbReducer,
  });
}
