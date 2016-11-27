import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import createApiReducer from '../api/reducers';


const loggerMiddleware = createLogger();


export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const api = createApiReducer();
  const rootReducer = combineReducers({
    api,
  });

  return {
    ...createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        loggerMiddleware,
      ),
    ),
    runSaga: sagaMiddleware.run,
  };
}
