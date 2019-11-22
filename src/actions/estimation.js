import * as actionTypes from '../constant/index';

export const arrangeRow = data => {
  return {
    type: actionTypes.ARRANGE_ROW,
    data: data
  };
};

export const addRow = id => {
  return {
    type: actionTypes.ADD_ROW,
    id: id
  };
};
export const removeRow = row => {
  return {
    type: actionTypes.REMOVE_ROW,
    data: row
  };
};
export const editCell = (cellId, name, value) => {
  return {
    type: actionTypes.EDIT_CELL,
    data: { cellId: cellId, name: name, value: value }
  };
};
export const toggleTick = cellId => {
  return {
    type: actionTypes.TOGGLE_TICK,
    data: cellId
  };
};
