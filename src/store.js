import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';
import { saveState } from './localStorage';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(logger))
  );
  store.subscribe(() => {
    saveState({
      ...store.getState().tree,
      ...store.getState().toggleEstimation,
      ...store.getState().estimation
    });
  });
  return store;
}
