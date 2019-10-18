import React from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import { addChild, addSibling } from '../actions/cell';
const uuidv4 = require('uuid/v4');

const TreeNode = props => {
  console.log('initital tree ', props.tree);
  const { tree } = props;
  const { dispatchAddChild, dispatchAddSibling } = props;
  const handleAddChild = cell => {
    const id = uuidv4();
    let newCell = {};
    newCell[`${id}`] = {
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
    newCell[`${id}`] = {
      group: 'body',
      id: id,
      name: '...',
      parentId: cell.parentId
    };
    tree.map((t, key) => {
      if (t.parentId === newCell.parentId) {
        Object.entries(t).map(tt => {
          if (tt[0] !== 'te83nwko7b') {
            if (!tt[1].siblingId) {
              tt[1].siblingId = 0;
            }
            newCell[`${id}`].siblingId = tt[1].siblingId + 1;
          }
        });
      }
    });
    dispatchAddSibling(newCell);
  };
  return (
    <div className="flex items-center justify-center">
      <div>
        {tree &&
          tree.children &&
          tree.children.length > 0 &&
          tree.children.map((treeNode, key) => (
            <div key={key}>
              <Cell
                key={key}
                cell={treeNode}
                handleAddChild={handleAddChild}
                handleAddSibling={handleAddSibling}
              />
              {treeNode.children.length > 0 && <TreeNode tree={treeNode} />}
            </div>
          ))}
      </div>
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
  const tree = state.tree._root;
  return { tree: tree || undefined };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
