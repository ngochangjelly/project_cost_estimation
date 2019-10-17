import React from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import { addChild, addSibling } from '../actions/cell';
const uuidv4 = require('uuid/v4');

const TreeNode = props => {
  const { tree } = props;
  console.log(tree);
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
    tree.map(t => {
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
          tree.map(t =>
            Object.entries(t).map((tr, key) => {
              return (
                <Cell
                  key={key}
                  cell={tr[1]}
                  handleAddChild={handleAddChild}
                  handleAddSibling={handleAddSibling}
                />
              );
            })
          )}
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
  const { tree } = state;
  return { tree: tree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
