import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(logger))
  );
  return store;
}
