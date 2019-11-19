import * as actionTypes from '../constant';
const uuidv4 = require('uuid/v4');

let estimation = [
  { id: 'asjahsada', title: '1', rate: 0, hours: 0, amount: 0 },
  { id: 'wervsvsd', title: '2', rate: 0, hours: 0, amount: 0 }
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
      const newRow = { id: id, title: '', rate: 0, hours: 0 };
      let count = 0;
      estimation.map(e => {
        console.log(e);
        console.log(data);
        if (e.id === data) {
          estimation.push(newRow);
          count = 1;
        }
        console.log('yup');
      });
      if (count === 0) {
        estimation.push(newRow);
      }
      return [...estimation];
    case actionTypes.REMOVE_ROW:
      estimation = estimation.filter(it => it.id !== data.id);
      return [...estimation];
    default:
      return state;
  }
};
