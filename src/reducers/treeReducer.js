import * as actionTypes from '../constant';
import { initTree } from '../constant/tree';

const ChartTree = initTree();
//add root node to tree
ChartTree._addNode({
  group: 'main',
  id: 'te83nwko7b',
  name: 'Main page',
  parentId: '',
  root: true
});
//seed other node
// ChartTree._addNode(
//   {
//     group: 'body',
//     id: 'te83nwkoaa',
//     name: 'Body',
//     parentId: 'te83nwko7b',
//     isFirstChild: true,
//     isLastChild: false
//   },
//   'te83nwko7b'
// );
// ChartTree._addNode(
//   {
//     group: 'body',
//     id: '22nwkoaa',
//     name: '1',
//     parentId: 'te83nwko7b',
//     isFirstChild: false,
//     isLastChild: true
//   },
//   'te83nwko7b'
// );
const tree = ChartTree;
const initialState = {
  tree
};
export const treeReducer = (state = initialState, action) => {
  const { cell } = action;
  let { tree } = state;
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      // check to find cell position as a child and sibling
      let childPosition = tree._search(cell.value.parentId).children.length;
      if (childPosition !== 0) {
        cell.value.isLastChild = true;
      }
      if (childPosition === 0) {
        cell.value.isFirstChild = true;
      }
      tree._addNode(cell, cell.value.parentId);
      return { ...state, tree };
    case actionTypes.ADD_SIBLING:
      tree._addNode(cell, cell.value.parentId);
      return { ...state, tree };
    case actionTypes.REMOVE_CELL:
      tree._removeNode(cell.id);
      return { ...state, tree };
    default:
      return state;
  }
};
