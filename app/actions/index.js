import { API_PARAMETERS } from '../api/config';

export const ADD_API_ITEMS = 'ADD_API_ITEMS';
export const ADD_PARAM_VALUES = 'ADD_PARAM_VALUES';

export const SELECT_SINGLE = 'SELECT_SINGLE';
export const SELECT_MULTI = 'SELECT_MULTI';
export const SELECT_RANGE = 'SELECT_RANGE';


function action(type, payload = {}) {
  return { type, ...payload };
}

export const selectSingleValue = (name, value) => action(SELECT_SINGLE, { name, value });
export const selectMultiValue = (name, values) => action(SELECT_MULTI, { name, values });
export const selectRangeValue = (name, { from, to }) => action(SELECT_RANGE, { name, from, to });

export const loadAPI = () => action(ADD_API_ITEMS, { items: API_PARAMETERS });
export const addAPIValues = (name, values, payload) =>
  action(ADD_PARAM_VALUES, { name, values, payload });
