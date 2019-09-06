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
    case "ADD_CHILD":
      return state.concat(action.cell);
    default:
      return state;
  }
}
