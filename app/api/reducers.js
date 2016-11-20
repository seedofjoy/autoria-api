import { combineReducers } from 'redux';
import {
    ADD_API_ITEMS_BATCH,
    ADD_PARAM_VALUES,
    SELECT_MULTI,
    SELECT_SINGLE,
} from './actions';


function params(state = [], action) {
  switch (action.type) {
    case ADD_API_ITEMS_BATCH:
      return [...state, ...action.items];
    default:
      return state;
  }
}


function values(state = {}, action) {
  switch (action.type) {
    case ADD_PARAM_VALUES:
      return {
        ...state,
        [action.name]: {
          items: action.values,
          payload: action.payload,
        },
      };
    default:
      return state;
  }
}

function select(state = {}, action) {
  switch (action.type) {
    case SELECT_SINGLE:
      return { ...state, [action.name]: action.value };
    case SELECT_MULTI:
      return { ...state, [action.name]: action.values };
    default:
      return state;
  }
}


export default function createApiReducer() {
  return combineReducers({
    params,
    values,
    select,
  });
}
