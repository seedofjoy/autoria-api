import _ from 'lodash';
import { API_PARAMETERS, FETCH_TYPE } from './config';
import { addApiItemsBatch, addAPIValues, addAverage } from './actions';
import {
  getItemsByFetchType,
  isDependencySatisfied,
  getSelectedDependencies,
  fillUrlByDependencies,
  withNotSameDependencies,
} from './utils';


function prepareItemValue(dispatch, state, apiItem) {
  switch (apiItem.fetchType) {

    case FETCH_TYPE.API_CALL:
      return fetch(apiItem.payload.fetchUrl)
        .then(response => response.json())
        .then(values => dispatch(addAPIValues(apiItem.name, values)));

    case FETCH_TYPE.API_CALL_DEPENDENT: {
      const { fetchUrl, dependsOn } = apiItem.payload;
      const selectedDependencies = getSelectedDependencies(state.api.select, dependsOn);
      const url = fillUrlByDependencies(selectedDependencies, fetchUrl);
      return fetch(url)
        .then(response => response.json())
        .then(values => dispatch(addAPIValues(apiItem.name, values, { selectedDependencies })));
    }

    default:
      throw new Error(`Unknown fetchType: ${apiItem.fetchType}`);
  }
}


export function fetchAPIValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;

    const preloadPromises =
      getItemsByFetchType(api.params, FETCH_TYPE.API_CALL)
        .map(prepareItemValue.bind(null, dispatch, state));
    return Promise.all(preloadPromises);
  };
}


export function fetchDependsAPIValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;

    const preloadPromises =
      getItemsByFetchType(api.params, FETCH_TYPE.API_CALL_DEPENDENT)
        .filter(isDependencySatisfied.bind(null, api.select))
        .filter(withNotSameDependencies.bind(null, api.select, api.values))
        .map(prepareItemValue.bind(null, dispatch, state));
    return Promise.all(preloadPromises);
  };
}


export function fetchAverage() {
  return (dispatch, getState) => {
    const { api } = getState();
    const url = new URL('http://api.auto.ria.com/average');
    const params = api.select;

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(key, v));
      } else {
        url.searchParams.append(key, value);
      }
    });
    return fetch(url)
      .then(response => response.json())
      .then(stats => dispatch(addAverage(stats, params)));
  };
}


export function fetchAverageIfSelected() {
  return (dispatch, getState) => {
    const { api } = getState();
    if (_.isEqual(api.average.selectedFor, api.select)) {
      return;
    }

    dispatch(fetchAverage());
  };
}


export function initApp() {
  return (dispatch) => {
    dispatch(addApiItemsBatch(API_PARAMETERS));
    dispatch(fetchAPIValues());
  };
}
