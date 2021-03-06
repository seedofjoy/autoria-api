import _ from 'lodash';
import { combineReducers } from 'redux';
import {
    ADD_API_ITEMS_BATCH,
    ADD_PARAM_VALUES,
    SELECT_MULTI,
    SELECT_SINGLE,
    SELECT_RANGE,
    ADD_AVERAGE,
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
      if (_.isNil(action.value)) {
        return _.omit(state, action.name);
      }
      return { ...state, [action.name]: action.value };
    case SELECT_MULTI:
      if (_.isEmpty(action.values)) {
        return _.omit(state, action.name);
      }
      return { ...state, [action.name]: action.values };
    case SELECT_RANGE:
      return { ...state, [action.name]: [action.from, action.to] };
    default:
      return state;
  }
}

function average(state = { stats: null, selectedFor: {} }, action) {
  switch (action.type) {
    case ADD_AVERAGE:
      return {
        stats: action.stats,
        selectedFor: action.selectedFor,
      };
    default:
      return state;
  }
}


export default function createApiReducer() {
  return combineReducers({
    params,
    values,
    select,
    average,
  });
}
