import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';


function params(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_API_ITEMS:
      return [...state, ...action.items];
    default:
      return state;
  }
}

function values(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ADD_PARAM_VALUES:
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


const rootReducer = combineReducers({
  params,
  values,
});


export default rootReducer;



// import _ from 'lodash';
// import { combineReducers } from 'redux';




// function select(state = {}, action) {
//   switch (action.type) {
//     case SELECT_SINGLE:
//       if (_.isNil(action.value)) {
//         return _.omit(state, action.name);
//       }
//       return { ...state, [action.name]: action.value };
//     case SELECT_MULTI:
//       if (_.isEmpty(action.values)) {
//         return _.omit(state, action.name);
//       }
//       return { ...state, [action.name]: action.values };
//     case SELECT_RANGE:
//       return { ...state, [action.name]: [action.from, action.to] };
//     default:
//       return state;
//   }
// }

// function average(state = { stats: null, selectedFor: {} }, action) {
//   switch (action.type) {
//     case RECIEVE_STATS:
//     case ADD_AVERAGE:
//       return {
//         stats: action.stats,
//         selectedFor: action.selectedFor,
//       };
//     default:
//       return state;
//   }
// }
