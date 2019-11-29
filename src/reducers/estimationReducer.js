import * as actionTypes from '../constant';
import { getColor } from '../utils/getColor';
import * as localStorage from '../utils/localStorage';
import * as constant from '../constant';
const uuidv4 = require('uuid/v4');

let defaultValue = [
  {
    id: 'root',
    title: '1',
    order: 0,
    rate: 0,
    hours: 0,
    amount: 0,
    activated: true,
    color: getColor(0)
  }
];
let initialState;
if (localStorage.check(constant.ESTIMATION)) {
  initialState = localStorage.get(constant.ESTIMATION);
} else {
  initialState = defaultValue;
}

export const estimationReducer = (state = initialState, action) => {
  const { data } = action;
  let estimation;
  switch (action.type) {
    case actionTypes.ARRANGE_ROW:
      estimation = data;
      return [...estimation];
    case actionTypes.ADD_ROW:
      const id = uuidv4();
      var position = state.length;
      const newRow = {
        id: id,
        title: '',
        rate: 0,
        hours: 0,
        color: getColor(position),
        activated: true
      };
      let count = 0;
      state.map(e => {
        if (e.id === data) {
          state.push(newRow);
          count = 1;
        }
      });
      if (count === 0) {
        state.push(newRow);
      }
      return [...state];
    case actionTypes.REMOVE_ROW:
      state = state.filter(it => it.id !== data.id);
      return [...state];
    case actionTypes.EDIT_CELL:
      let { cellId, value, name } = data;
      state.map(e => {
        if (e.id === cellId) {
          e[`${name}`] = value;
        }
      });
      return [...state];
    case actionTypes.TOGGLE_TICK:
      state.map(e => {
        if (e.id === data) {
          e.activated = !e.activated;
        }
      });
      return [...state];
    default:
      return state;
  }
};
