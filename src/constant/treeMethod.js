const tree = localStorage.getItem('tree');
export function addNode(value, parentValue) {
  const newNode = {
    value: value,
    children: []
  };

  if (this._root === null) {
    this._root = newNode;
    return;
  }

  this._traverse(node => {
    if (node.value.id === parentValue) {
      return node.children.push(value);
    }
  });
}
