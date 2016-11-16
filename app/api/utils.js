export function getItemsByFetchType(state, fetchType) {
  const { api: { params } } = state;
  return params.filter(apiItem => apiItem.fetchType === fetchType);
}

export { getItemsByFetchType as default };
