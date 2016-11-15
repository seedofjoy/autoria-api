import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createApiReducer from '../reducers';


const loggerMiddleware = createLogger();


export default function configureStore(preloadedState) {
  const api = createApiReducer();
  const rootReducer = combineReducers({
    api,
  });

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
