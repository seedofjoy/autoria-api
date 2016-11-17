import { API_PARAMETERS, FETCH_TYPE } from './config';
import { getItemsByFetchType, isDependencySatisfied, fillUrlByDependencies } from './utils';

export const ADD_PARAM_VALUES = 'ADD_PARAM_VALUES';
export const ADD_API_ITEMS_BATCH = 'ADD_API_ITEMS_BATCH';

export const SELECT_SINGLE = 'SELECT_SINGLE';
export const SELECT_MULTI = 'SELECT_MULTI';


export function selectSingleValue(name, selectedValue) {
  return (dispatch, getState) => {
    const { api: { values } } = getState();
    if (!(name && Object.hasOwnProperty.call(values, name))) {
      throw new Error(`No values for param "${name}"`);
    }
    return dispatch({ type: SELECT_SINGLE, value: selectedValue, name });
  };
}


export function selectMultiValue(name, selectedValues) {
  return (dispatch, getState) => {
    const { api: { values } } = getState();
    if (!(name && Object.hasOwnProperty.call(values, name))) {
      throw new Error(`No values for param "${name}"`);
    }
    return dispatch({ type: SELECT_MULTI, values: selectedValues, name });
  };
}


function addAPIValues(name, values) {
  return { type: ADD_PARAM_VALUES, name, values };
}


function addApiItemsBatch(apiItems) {
  return { type: ADD_API_ITEMS_BATCH, items: apiItems };
}


function prepareItemValue(dispatch, state, apiItem) {
  switch (apiItem.fetchType) {
    case FETCH_TYPE.API_CALL:
      return fetch(apiItem.payload.fetchUrl)
        .then(response => response.json())
        .then(values => dispatch(addAPIValues(apiItem.name, values)));
    case FETCH_TYPE.API_CALL_DEPENDENT: {
      const { fetchUrl, dependsOn } = apiItem.payload;
      const url = fillUrlByDependencies(state.api.select, fetchUrl, dependsOn);
      return fetch(url)
        .then(response => response.json())
        .then(values => dispatch(addAPIValues(apiItem.name, values)));
    }
    default:
      throw new Error(`Unknown fetchType: ${apiItem.fetchType}`);
  }
}


function preloadAPIValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;

    const itemsToPreload = getItemsByFetchType(api.params, FETCH_TYPE.API_CALL);
    const preloadPromises = itemsToPreload.map(prepareItemValue.bind(null, dispatch, state));
    return Promise.all(preloadPromises);
  };
}


export function initApp() {
  return (dispatch) => {
    dispatch(addApiItemsBatch(API_PARAMETERS));
    dispatch(preloadAPIValues());
  };
}


export function fetchDependsValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;

    const dependsItems = getItemsByFetchType(api.params, FETCH_TYPE.API_CALL_DEPENDENT);
    const satisfiedDepsItems = dependsItems.filter(isDependencySatisfied.bind(null, api.select));

    const preloadPromises = satisfiedDepsItems.map(prepareItemValue.bind(null, dispatch, state));
    return Promise.all(preloadPromises);
  };
}
