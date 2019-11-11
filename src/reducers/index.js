import { combineReducers } from 'redux';
import { treeReducer as tree } from './treeReducer';
import { toggleEstimationReducer as toggleEstimation } from './toggleEstimationReducer';
import { estimationReducer as estimation } from './estimationReducer';

export default combineReducers({
  tree,
  toggleEstimation,
  estimation
});
