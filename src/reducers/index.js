import { combineReducers } from 'redux';
import { treeReducer as tree } from './treeReducer';
import { toggleEstimationReducer as toggleEstimation } from './toggleEstimationReducer';
export default combineReducers({
  tree,
  toggleEstimation
});
