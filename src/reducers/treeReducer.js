import * as actionTypes from '../constant';
import { initTree } from '../constant/tree';
import { getPosition } from '../utils/getPosition';

const ChartTree = initTree();
//default root node to tree
ChartTree._addNode({
  group: 'main',
  id: 'te83nwko7b',
  name: 'Root',
  root: true,
  hasChildren: false
});

const tree = ChartTree;
const initialState = {
  tree
};
export const treeReducer = (state = initialState, action) => {
  const { cell } = action;
  const parentId = cell?.value?.parentId;
  const siblingId = cell?.value?.siblingId;
  let { tree } = state;
  const parentNode = tree._search(parentId);
  const position = parentNode?.children?.length;
  const length = parentNode?.children?.length;
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      cell.value.position = getPosition(length, position);
      //toggle previous sibling node into isChild
      if (parentNode.children.length > 1) {
        parentNode.children[length - 1].value.position = 'isChild';
      }
      //toggle previous sibling to be first node if there are 2 siblings
      if (length === 1) {
        parentNode.children[0].value.position = 'isFirstChild';
      }
      //toggle parent hasChildren field to true
      parentNode.value.hasChildren = true;
      tree._addNode(cell, parentId);
      return { ...state, tree };
    case actionTypes.ADD_SIBLING:
      const childPos = tree._childPosition(parentId, siblingId);
      if (length === 1) {
        parentNode.children[0].value.position = 'isFirstChild';
        cell.value.position = 'isLastChild';
      }
      if (length > 1 && childPos === length - 1) {
        cell.value.position = 'isLastChild';
        parentNode.children[length - 1].value.position = 'isChild';
      }
      if (length > 1 && childPos !== length - 1) {
        cell.value.position = 'isChild';
      }
      tree._addSibling(cell, parentId, siblingId);
      return { ...state, tree };
    case actionTypes.REMOVE_CELL:
      tree._removeNode(cell.id);
      const parentLength = tree._search(cell.parentId).children.length;
      //is cell is first
      if (tree._search(cell.parentId).children.length > 1) {
        tree._search(cell.parentId).children[0].value.position = 'isFirstChild';
        tree._search(cell.parentId).children[parentLength - 1].value.position =
          'isLastChild';
      }
      //if cell if first child in 2-child-array
      if (tree._search(cell.parentId).children.length === 1) {
        tree._search(cell.parentId).children[0].value.position = '';
      }
      //if cell is last cell
      if (tree._search(cell.parentId).children.length === 1) {
        tree._search(cell.parentId).children[0].value.position = '';
      }
      return { ...state, tree };
    default:
      return state;
  }
};
