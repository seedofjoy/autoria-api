import _ from 'lodash';
import { API_PARAMETERS, FETCH_TYPE, SELECT_TYPE } from './config';
import {
  addApiItemsBatch,
  addAPIValues,
  addAverage,
  selectMultiValue,
  selectSingleValue,
} from './actions';
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


export function selectDefaults(fetchType) {
  return (dispatch, getState) => {
    const { api } = getState();

    getItemsByFetchType(api.params, fetchType)
      .filter(item => !_.isNil(item.payload.default))
      .forEach(({ name, payload }) => {
        const defaults = payload.default;
        const selectFunc = _.isArray(defaults)
          ? selectMultiValue
          : selectSingleValue;

        dispatch(selectFunc(name, defaults));
      });
  };
}


export function fetchAPIValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;

    const preloadPromises =
      getItemsByFetchType(api.params, FETCH_TYPE.API_CALL)
        .map(prepareItemValue.bind(null, dispatch, state));

    return Promise
      .all(preloadPromises)
      .then(() => dispatch(selectDefaults(FETCH_TYPE.API_CALL)));
  };
}


export function addSimpleAPIValues() {
  return (dispatch, getState) => {
    const state = getState();
    const { api } = state;
    getItemsByFetchType(api.params, FETCH_TYPE.SIMPLE_VALUE)
      .filter(_.matchesProperty('selectType', SELECT_TYPE.SINGLE))
      .forEach((apiItem) => {
        dispatch(addAPIValues(apiItem.name, apiItem.payload.values));
      });
    dispatch(selectDefaults(FETCH_TYPE.SIMPLE_VALUE));
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
    const selectParams = api.select;

    Object.keys(selectParams).forEach((key) => {
      const value = selectParams[key];
      if (Array.isArray(value)) {
        value
          .filter(_.negate(_.isNil))
          .forEach(v => url.searchParams.append(key, v));
      } else {
        url.searchParams.append(key, value);
      }
    });
    return fetch(url)
      .then(response => response.json())
      .then(stats => dispatch(addAverage(stats, selectParams)));
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
    dispatch(addSimpleAPIValues());
    dispatch(fetchAPIValues());
  };
}
