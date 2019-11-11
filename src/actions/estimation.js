import * as actionTypes from '../constant/index';

export const arrangeRow = data => {
  console.log(data);
  return {
    type: actionTypes.ARRANGE_ROW,
    data: data
  };
};
