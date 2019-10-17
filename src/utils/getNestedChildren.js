export function getNestedChildren(arr, parent) {
  var output = [];
  for (var i in arr) {
    if (arr[i].parent == parent) {
      var children = getNestedChildren(arr, arr[i].id);

      if (children.length) {
        arr[i].children = children;
      }
      output.push(arr[i]);
    }
  }
  return output;
}
