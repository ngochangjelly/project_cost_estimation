import * as actionTypes from '../constant';
import { initTree } from '../constant/tree';
import produce from 'immer';

const ChartTree = initTree();
//add root node to tree
ChartTree._addNode({
  group: 'main',
  id: 'te83nwko7b',
  name: 'Main page',
  root: true
});
//seed other node
ChartTree._addNode(
  {
    group: 'body',
    id: 'te83nwkoaa',
    name: 'Body'
  },
  'te83nwko7b'
);
ChartTree._addNode(
  {
    group: 'body',
    id: '22nwkoaa',
    name: '1'
  },
  'te83nwko7b'
);
const tree = ChartTree;
const initialState = {
  tree
};
export const treeReducer = produce((state = initialState, action) => {
  const { cell } = action;
  console.log(cell);
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      let tree = state.tree;
      tree._addNode(cell, cell.value.parentId);
      return { ...state, tree };
    case actionTypes.ADD_SIBLING:
      state.tree._addNode(cell, cell.parentId);
      return state;
    default:
      return state;
  }
});
