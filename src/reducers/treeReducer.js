import * as actionTypes from '../constant';
import { initTree } from '../constant/tree';
import { getPosition } from '../utils/getPosition';
import * as positionTypes from '../constant/position';

let ChartTree;

let tree = initTree();
// console.log(!localStorage.check());
// if (!localStorage.check() === true) {
//   ChartTree = {
//     group: 'main',
//     id: 'te83nwko7b',
//     name: 'Root',
//     root: true,
//     hasChildren: false,
//     children: []
//   };
//   localStorage.set(ChartTree);
//   tree._addNode(ChartTree);
// } else {
//   ChartTree = localStorage.get();
//   tree._addNode(ChartTree._root);
// }
tree._addNode({
  group: 'main',
  id: 'te83nwko7b',
  name: 'Root',
  root: true,
  hasChildren: false,
  children: []
});
const initialState = {
  tree
};
export const treeReducer = (state = initialState, action) => {
  const { cell } = action;
  let parentId = cell?.value?.parentId;
  const siblingId = cell?.value?.siblingId || action.siblingId;
  let { tree } = state;
  let parentNode = tree?._search(parentId);
  const position = parentNode?.children?.length;
  const length = parentNode?.children?.length;
  let childPos, cellPos;
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      cell.value.position = getPosition(length, position);
      //toggle previous sibling node into isChild
      if (parentNode.children.length > 1) {
        parentNode.children[length - 1].value.position = positionTypes.isChild;
      }
      //toggle previous sibling to be first node if there are 2 siblings
      if (length === 1) {
        parentNode.children[0].value.position = positionTypes.isFirstChild;
      }
      //toggle parent hasChildren field to true
      parentNode.value.hasChildren = true;
      tree._addNode(cell, parentId);
      return { ...state, tree };

    case actionTypes.APPEND_CHILD:
      cellPos = cell.value.position;
      tree._removeNode(cell.value.id);
      cell.value.parentId = action.parentId;
      cell.value.position = '';
      tree._addNode(cell, action.parentId);
      tree._search(action.parentId).value.hasChildren = true;
      //handle position of target's parent node
      const grandparent = tree._search(
        tree._search(action.parentId).value.parentId
      );
      const grandLength = grandparent.children.length;
      if (grandLength === 1) {
        grandparent.children[0].value.position = '';
      }
      //handle position of the dragged cell
      if (length - 1 === 1) {
        parentNode.children[0].position = '';
      }
      childPos = tree._childPosition(parentId, cell.value.id);
      if (length - 1 > 1 && cellPos === positionTypes.isFirstChild) {
        parentNode.children[0].value.position = positionTypes.isFirstChild;
      }
      if (length - 1 > 1 && cellPos === positionTypes.isLastChild) {
        if (parentNode) {
          parentNode.children[length - 2].value.position =
            positionTypes.isLastChild;
        }
      }
      //end of position handling
      console.log(tree);
      return { ...state, tree };

    case actionTypes.ADD_SIBLING:
      if (length === 1) {
        parentNode.children[0].value.position = positionTypes.isFirstChild;
        cell.value.position = positionTypes.isLastChild;
      }
      if (length > 1 && childPos === length - 1) {
        cell.value.position = positionTypes.isLastChild;
        parentNode.children[length - 1].value.position = positionTypes.isChild;
      }
      if (length > 1 && childPos !== length - 1) {
        cell.value.position = positionTypes.isChild;
      }
      tree._addSibling(cell, parentId, siblingId, 'right');
      return { ...state, tree };

    case actionTypes.APPEND_RIGHT_SIBLING:
      parentId = tree._search(siblingId).value.parentId;
      childPos = tree._childPosition(parentId, siblingId);
      cellPos = tree?._childPosition(parentId, cell.value.id);
      if (cellPos !== childPos + 1 && cellPos !== childPos) {
        if (cellPos === 0 && childPos !== length - 1) {
          parentNode.children[1].value.position = positionTypes.isFirstChild;
          cell.value.position = positionTypes.isChild;
        }
        if (cellPos === 0 && childPos === length - 1 && length === 2) {
          parentNode.children[1].value.position = positionTypes.isFirstChild;
          cell.value.position = positionTypes.isLastChild;
        }
        if (cellPos === 0 && childPos === length - 1 && length > 2) {
          parentNode.children[1].value.position = positionTypes.isFirstChild;
          parentNode.children[length - 1].value.position =
            positionTypes.isChild;
          cell.value.position = positionTypes.isLastChild;
        }
        if (cellPos !== 0 && childPos === length - 1) {
          cell.value.position = positionTypes.isLastChild;
          parentNode.children[length - 2].value.position =
            positionTypes.isChild;
        }
        if (cellPos === length - 1) {
          parentNode.children[length - 2].value.position =
            positionTypes.isLastChild;
          cell.value.position = positionTypes.isChild;
        }
        if (
          length > 2 &&
          cellPos !== 0 &&
          cellPos !== length - 1 &&
          childPos === length - 1
        ) {
          cell.value.position = positionTypes.isLastChild;
          parentNode.children[length - 1].value.position =
            positionTypes.isChild;
        }
        tree._removeNode(cell.value.id);
        tree._addSibling(cell, parentId, siblingId, 'right');
      }
      return { ...state, tree };

    case actionTypes.APPEND_LEFT_SIBLING:
      parentId = tree._search(siblingId).value.parentId;
      childPos = tree._childPosition(parentId, siblingId);
      cellPos = tree._childPosition(parentId, cell.value.id);
      if (cellPos !== childPos - 1 && childPos !== cellPos) {
        if (childPos === 0 && cellPos !== length - 1) {
          cell.value.position = positionTypes.isFirstChild;
          parentNode.children[0].value.position = positionTypes.isChild;
        }

        if (childPos === 0 && cellPos === length - 1) {
          cell.value.position = positionTypes.isFirstChild;
          parentNode.children[0].value.position = positionTypes.isChild;
          parentNode.children[length - 2].value.position =
            positionTypes.isLastChild;
        }
        if (cellPos === 0 && childPos === length - 1) {
          cell.value.position = positionTypes.isChild;
          parentNode.children[1].value.position = positionTypes.isFirstChild;
        }
        if (childPos !== 0 && cellPos === length - 1) {
          cell.value.position = positionTypes.isChild;
          parentNode.children[childPos].value.position =
            positionTypes.isLastChild;
        }
        tree._removeNode(cell.value.id);
        tree._addSibling(cell, parentId, siblingId, 'left');
      }
      return { ...state, tree };

    case actionTypes.REMOVE_CELL:
      tree._removeNode(cell.id);
      const parentLength = tree?._search(cell.parentId)?.children.length;
      //is cell is first
      if (tree._search(cell.parentId).children.length > 1) {
        tree._search(cell.parentId).children[0].value.position =
          positionTypes.isFirstChild;
        tree._search(cell.parentId).children[parentLength - 1].value.position =
          positionTypes.isLastChild;
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
