import _ from 'lodash';
import { call, put, fork, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../api';
import { getItemsByFetchType } from '../api/utils';
import { FETCH_TYPE, SELECT_TYPE } from '../api/config';


function* loadSimpleAPIValues(params) {
  const simpleValueItems =
    getItemsByFetchType(params, FETCH_TYPE.SIMPLE_VALUE)
      .filter(_.matchesProperty('selectType', SELECT_TYPE.SINGLE));

  const effects = simpleValueItems
    .map((apiItem) => {
      return put(actions.addAPIValues(apiItem.name, apiItem.payload.values));
    });
  yield effects;
}

function* fetchApiValue(apiItem) {
  const values = yield call(api.call, apiItem.payload.fetchUrl);
  yield put(actions.addAPIValues(apiItem.name, values));
}

function* loadAPICallValues(params) {
  const apiCallItems = getItemsByFetchType(params, FETCH_TYPE.API_CALL);
  const effects = apiCallItems.map(apiItem => call(fetchApiValue, apiItem));
  yield effects;
}

function* loadAPI() {
  yield take(actions.ADD_API_ITEMS);
  const { params } = yield select();

  yield call(loadSimpleAPIValues, params);
  yield call(loadAPICallValues, params);
}


export function* rootSaga() {
  yield [
    fork(loadAPI),
  ];
  // yield throttle(1000, AVERAGE_FETCH_REQUESTED, fetchAverage);
}
