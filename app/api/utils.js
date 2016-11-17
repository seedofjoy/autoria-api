export function getItemsByFetchType(apiParams, fetchType) {
  return apiParams.filter(apiItem => apiItem.fetchType === fetchType);
}


export function isDependencySatisfied(apiSelect, { payload }) {
  if (!(payload && payload.dependsOn && payload.dependsOn.length > 0)) {
    return true;
  }

  for (const dependency of payload.dependsOn) {
    if (!apiSelect[dependency]) {
      return false;
    }
  }
  return true;
}


export function fillUrlByDependencies(apiSelect, urlTemplate, dependsOn) {
  return dependsOn.reduce((currentUrlTemplate, dependency) => {
    const depValue = apiSelect[dependency];
    return currentUrlTemplate.replace(`:${dependency}`, depValue);
  }, urlTemplate);
}


export { getItemsByFetchType as default };
