import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware());
}
