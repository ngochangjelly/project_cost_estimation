export class Tree {
  constructor(root) {
    this._root = root || null;
  }

  _traverse(callback) {
    function goThrough(node) {
      callback(node);
      node.children.forEach(child => {
        goThrough(child);
      });
    }
    goThrough(this._root);
  }

  _addNode(value, parentValue) {
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

  _addSibling(value, parentValue, siblingValue) {
    this._traverse(node => {
      if (node.value.id === parentValue) {
        //find its left sibling position
        let siblingPosition;
        node.children.map((n, key) => {
          if (n.value.id === siblingValue) {
            siblingPosition = key;
          }
        });
        return node.children.splice(siblingPosition + 1, 0, value);
      }
    });
  }

  _removeNode(value) {
    this._traverse(node => {
      node.children.forEach((childNode, index) => {
        if (childNode.value.id === value) {
          node.children.splice(index, 1);
        }
      });
    });
  }

  _search(value) {
    let returnNode = 'Not Found';
    this._traverse(node => {
      if (node.value.id === value) {
        returnNode = node;
      }
    });
    return returnNode;
  }

  _displayLeafs(parentValue) {
    const parentNode =
      typeof parentValue === 'string' ? this._search(parentValue) : parentValue;
    let leafsRet = [];
    if (parentValue.children && !parentValue.children.length) {
      return parentValue;
    }

    parentNode.children.forEach(child => {
      leafsRet.push(this._displayLeafs(child));
    });

    return leafsRet.flat();
  }

  _childPosition(parentValue, siblingValue) {
    let position;
    this._search(parentValue).children.map((n, key) => {
      if (n.value.id === siblingValue) {
        position = key;
      }
    });
    return position;
  }
}

export const initTree = () => {
  const tree = new Tree();
  return tree;
};
