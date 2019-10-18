import * as actionTypes from '../constant';
import { Tree, initTree } from '../constant/tree';

const ChartTree = initTree();
//add root node to tree
ChartTree._addNode({
  group: 'main',
  id: 'te83nwko7b',
  name: 'Main page',
  root: true
});
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
    name: 'Body2'
  },
  'te83nwkoaa'
);
ChartTree._addNode(
  {
    group: 'body',
    id: 'we2a4nwkoaa',
    name: 'Body3'
  },
  'te22nwkoaa'
);
ChartTree._addNode(
  {
    group: 'body',
    id: 'hello',
    name: 'Body3'
  },
  'te22nwkoaa'
);

export function treeReducer(state = ChartTree || null, action) {
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
