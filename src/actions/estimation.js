import * as actionTypes from '../constant/index';

export const toggleEstimation = isOpen => {
  return {
    type: actionTypes.TOGGLE_ESTIMATION,
    isOpen: isOpen
  };
};
