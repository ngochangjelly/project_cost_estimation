import * as actionTypes from '../constant/index';
import { toggleEstimation } from '../actions/toggleEstimation';

const initialState = true;

export const toggleEstimationReducer = (state = initialState, action) => {
  const { isOpen } = action;
  switch (action.type) {
    case actionTypes.TOGGLE_ESTIMATION:
      return isOpen;
    default:
      return initialState;
  }
};
