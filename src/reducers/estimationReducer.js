import * as estimation from '../constant/estimationTable';
import * as actionTypes from '../constant';

const initialState = [
  { title: '1', rate: 0, hours: 0, amount: 0 },
  { title: '2', rate: 0, hours: 0, amount: 0 }
];

export const estimationReducer = (state = initialState, action) => {
  console.log(action);
  const { data } = action;
  switch (action.type) {
    case actionTypes.ARRANGE_ROW:
      return data;
    default:
      return state;
  }
};
