import _ from 'lodash';


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


export function fillUrlByDependencies(selectedDependencies, urlTemplate) {
  return Object.keys(selectedDependencies).reduce((currentUrlTemplate, key) => {
    const depValue = selectedDependencies[key];
    return currentUrlTemplate.replace(`:${key}`, depValue);
  }, urlTemplate);
}


export function withNotSameDependencies(apiSelect, apiValues, apiItem) {
  const values = apiValues[apiItem.name];
  if (!values) {
    return true;
  }
  const prevDependencies = values.payload.selectedDependencies;
  const currDependencies = _.pick(apiSelect, Object.keys(prevDependencies));
  return !_.isEqual(prevDependencies, currDependencies);
}


export function getSelectedDependencies(apiSelect, dependsOn) {
  return _.pick(apiSelect, dependsOn);
}
