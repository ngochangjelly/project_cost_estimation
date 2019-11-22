import * as actionTypes from '../constant';
import { getColor } from '../utils/getColor';
const uuidv4 = require('uuid/v4');

let estimation = [
  {
    id: 'asjahsada',
    title: '1',
    order: 0,
    rate: 0,
    hours: 0,
    amount: 0,
    activated: true,
    color: getColor(0)
  },
  {
    id: 'wervsvsd',
    title: '2',
    rate: 0,
    hours: 0,
    amount: 0,
    activated: true,
    color: getColor(1)
  }
];
const initialState = estimation;

export const estimationReducer = (state = initialState, action) => {
  const { data } = action;
  switch (action.type) {
    case actionTypes.ARRANGE_ROW:
      estimation = data;
      return [...estimation];
    case actionTypes.ADD_ROW:
      const id = uuidv4();
      const position = estimation.length;
      const newRow = {
        id: id,
        title: '',
        rate: 0,
        hours: 0,
        color: getColor(position),
        activated: true
      };
      let count = 0;
      estimation.map(e => {
        if (e.id === data) {
          estimation.push(newRow);
          count = 1;
        }
      });
      if (count === 0) {
        estimation.push(newRow);
      }
      return [...estimation];
    case actionTypes.REMOVE_ROW:
      estimation = estimation.filter(it => it.id !== data.id);
      return [...estimation];
    case actionTypes.EDIT_CELL:
      let { cellId, value, name } = data;
      estimation.map(e => {
        if (e.id === cellId) {
          e[`${name}`] = value;
        }
      });
      return [...estimation];
    case actionTypes.TOGGLE_TICK:
      estimation.map(e => {
        if (e.id === data) {
          e.activated = !e.activated;
        }
      });
      return [...estimation];
    default:
      return state;
  }
};
