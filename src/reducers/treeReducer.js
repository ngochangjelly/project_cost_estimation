import * as actionTypes from "../constant";

export function treeReducer(
  state = [
    {
      te83nwko7b: {
        group: "main",
        id: "te83nwko7b",
        name: "Main page"
      }
    }
  ],
  action
) {
  switch (action.type) {
    case actionTypes.ADD_CHILD:
      return state.concat(action.cell);
    case actionTypes.ADD_SIBLING:
      return state.concat(action.cell);
    default:
      return state;
  }
}
