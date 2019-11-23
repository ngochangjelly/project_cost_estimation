import * as actionTypes from '../constant/index';
import { toggleEstimation } from '../actions/toggleEstimation';

const initialState = false;

export const toggleEstimationReducer = (state = initialState, action) => {
  const { isOpen } = action;
  console.log('to toggle reducer');
  switch (action.type) {
    case actionTypes.TOGGLE_ESTIMATION:
      return isOpen;
    default:
      return initialState;
  }
};
