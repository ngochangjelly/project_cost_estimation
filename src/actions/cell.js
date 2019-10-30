import * as actionTypes from '../constant/index';
export const addChild = cell => ({
  type: actionTypes.ADD_CHILD,
  cell: cell
});

export const addSibling = cell => ({
  type: actionTypes.ADD_SIBLING,
  cell: cell
});

export const removeCell = cell => ({
  type: actionTypes.REMOVE_CELL,
  cell: cell
});

export const appendSibling = (position, cell, siblingId) => {
  switch (position) {
    case 'right':
      return {
        type: actionTypes.APPEND_RIGHT_SIBLING,
        cell: cell,
        siblingId: siblingId
      };
    case 'left':
      return {
        type: actionTypes.APPEND_LEFT_SIBLING,
        cell: cell,
        siblingId: siblingId
      };
    default:
      return null;
  }
};
