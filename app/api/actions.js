export const ADD_PARAM_VALUES = 'ADD_PARAM_VALUES';
export const ADD_API_ITEMS_BATCH = 'ADD_API_ITEMS_BATCH';

export const SELECT_SINGLE = 'SELECT_SINGLE';
export const SELECT_MULTI = 'SELECT_MULTI';
export const SELECT_RANGE = 'SELECT_RANGE';

export const ADD_AVERAGE = 'ADD_AVERAGE';


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

export function selectRangeValue(name, { from, to }) {
  return { type: SELECT_RANGE, name, from, to };
}


export function addAPIValues(name, values, payload) {
  return { type: ADD_PARAM_VALUES, name, values, payload };
}


export function addApiItemsBatch(apiItems) {
  return { type: ADD_API_ITEMS_BATCH, items: apiItems };
}


export function addAverage(stats, selectedFor) {
  return { type: ADD_AVERAGE, stats, selectedFor };
}
