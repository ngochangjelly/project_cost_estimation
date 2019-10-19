import * as actionTypes from '../constant';
import { initTree } from '../constant/tree';

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
    id: 'te22nwkoaa',
    name: '1'
  },
  'te83nwkoaa'
);
ChartTree._addNode(
  {
    group: 'body',
    id: 'we2a4nwkoaa',
    name: '2'
  },
  'te22nwkoaa'
);
ChartTree._addNode(
  {
    group: 'body',
    id: 'we2a4nwkoaa',
    name: '2'
  },
  'te22nwkoaa'
);
const initialState = {
  tree: ChartTree
};
const tree = (state = initialState, action) => {
  const { cell } = action;
  let updatedTree;
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      ChartTree._addNode(cell, cell.parentId);
      updatedTree = ChartTree;
      state.tree = tree;
      return state;
    case actionTypes.ADD_SIBLING:
      ChartTree._addNode(cell, cell.parentId);
      updatedTree = ChartTree;
      return state;
    default:
      return state;
  }
};
export default tree;
