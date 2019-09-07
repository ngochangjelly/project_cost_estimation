import * as actionTypes from "../constant/index";
export const addChild = cell => ({
  type: actionTypes.ADD_CHILD,
  cell: cell
});

export const addSibling = cell => ({
  type: actionTypes.ADD_SIBLING,
  cell: cell
});
