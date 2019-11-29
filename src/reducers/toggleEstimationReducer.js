import * as actionTypes from '../constant/index';
import { toggleEstimation } from '../actions/toggleEstimation';
import { toggle } from '../constant/estimationTable';

const initialState = false;

export const toggleEstimationReducer = (state = initialState, action) => {
  const { isOpen } = action;
  switch (action.type) {
    case actionTypes.TOGGLE_ESTIMATION:
      return isOpen;
    case actionTypes.KEEP_TOGGLE:
      return toggle.true;
    case actionTypes.CLOSE_TOGGLE:
      return toggle.false;
    default:
      return initialState;
  }
};
