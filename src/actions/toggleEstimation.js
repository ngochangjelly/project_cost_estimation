import * as actionTypes from '../constant/index';

export const toggleEstimation = isOpen => {
  return {
    type: actionTypes.TOGGLE_ESTIMATION,
    isOpen: isOpen
  };
};
export const keepToggle = () => {
  return {
    type: actionTypes.KEEP_TOGGLE
  };
};
export const closeToggle = () => {
  return {
    type: actionTypes.CLOSE_TOGGLE
  };
};
