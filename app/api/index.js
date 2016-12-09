const API_ROOT = 'http://api.auto.ria.com/';

export function call(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
    ? API_ROOT + endpoint
    : endpoint;

  return fetch(fullUrl)
    .then(response => response.json());
}
