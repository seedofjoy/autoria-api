import { API_PARAMETERS } from '../api/config';

export const ADD_API_ITEMS = 'ADD_API_ITEMS';
export const ADD_PARAM_VALUES = 'ADD_PARAM_VALUES';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const loadAPI = () => action(ADD_API_ITEMS, { items: API_PARAMETERS });
export const addAPIValues = (name, values, payload) =>
  action(ADD_PARAM_VALUES, { name, values, payload });
