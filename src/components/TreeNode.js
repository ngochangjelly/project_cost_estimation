import React from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import { addChild, addSibling } from '../actions/cell';
const uuidv4 = require('uuid/v4');

const TreeNode = props => {
  const { tree } = props;
  const { dispatchAddChild, dispatchAddSibling } = props;
  const handleAddChild = cell => {
    const id = uuidv4();
    let newCell = {};
    newCell = {
      group: 'body',
      id: id,
      name: '...',
      parentId: cell.id
    };
    dispatchAddChild(newCell);
  };
  const handleAddSibling = cell => {
    const id = uuidv4();
    let newCell = {};
    newCell = {
      group: 'body',
      id: id,
      name: '...',
      parentId: cell.parentId
    };
    dispatchAddSibling(newCell);
  };
  return (
    <div className="flex items-center justify-center">
      {tree?.children?.length > 0 &&
        tree.children.map((treeNode, key) => (
          <div key={key}>
            <Cell
              key={key}
              cell={treeNode}
              handleAddChild={handleAddChild}
              handleAddSibling={handleAddSibling}
            />
            {treeNode.children.length > 0 && (
              <TreeNode
                tree={treeNode}
                dispatchAddChild={dispatchAddChild}
                dispatchAddSibling={dispatchAddSibling}
              />
            )}
          </div>
        ))}
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatchAddChild: cell => {
    dispatch(addChild(cell));
  },
  dispatchAddSibling: cell => {
    dispatch(addSibling(cell));
  }
});

const mapStateToProps = state => {
  const tree = state.tree.tree._root;
  return { tree: tree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
