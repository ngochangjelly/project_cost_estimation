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

export const appendSibling = (cell, siblingId) => ({
  type: actionTypes.APPEND_SIBLING,
  cell: cell,
  siblingId: siblingId
});
