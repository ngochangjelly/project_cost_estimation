import * as actionTypes from '../constant';
import { Tree, Node } from '../constant/tree';
const initialTree = [
  {
    te83nwko7b: {
      group: 'main',
      id: 'te83nwko7b',
      name: 'Main page',
      root: true
    }
  }
];
export function treeReducer(state = initialTree, action) {
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      const { cell } = action;
      return state.concat(action.cell);
    case actionTypes.ADD_SIBLING:
      return state.concat(action.cell);
    default:
      return state;
  }
}
