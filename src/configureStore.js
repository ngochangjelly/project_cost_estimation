import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import logger from 'redux-logger';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['tree'],
  stateReconciler: autoMergeLevel2
};
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  composeEnhancer(applyMiddleware(logger))
);
export const persistor = persistStore(store);
