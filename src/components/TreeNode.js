import React, { useState } from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import {
  addChild,
  appendChild,
  addSibling,
  removeCell,
  appendSibling
} from '../actions/cell';
const uuidv4 = require('uuid/v4');
var classNames = require('classnames');

//create your forceUpdate hook
function useForceUpdate() {
  console.log('force update');
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}

const calculateNodeWidth = id => {
  return id && document?.getElementById(id)?.offsetWidth;
};
const TreeNode = props => {
  const forceUpdate = useForceUpdate();
  const { tree } = props;
  const [activeCell, setActiveCell] = useState(null);

  const {
    dispatchAddChild,
    dispatchAppendChild,
    dispatchAddSibling,
    dispatchRemoveCell,
    dispatchAppendSibling
  } = props;

  const handleAddChild = cell => {
    const id = uuidv4();
    let newCell = {
      value: {
        group: 'body',
        id: id,
        name: 'name',
        parentId: cell.id,
        hasChildren: false
      },
      children: []
    };
    dispatchAddChild(newCell);
    forceUpdate();
  };

  const handleAppendChild = (cell, parentId) => {
    //prevent dropping at the same cell
    cell.value.id !== parentId && dispatchAppendChild(cell, parentId);
    forceUpdate();
  };
  const handleAddSibling = cell => {
    const id = uuidv4();

    let newCell = {
      value: {
        group: 'body',
        id: id,
        name: 'name',
        parentId: cell.parentId,
        siblingId: cell.id,
        hasChildren: false
      },
      children: []
    };
    dispatchAddSibling(newCell);
    forceUpdate();
  };

  const handleAppendSibling = (position, data, siblingId) => {
    let newCell = data;
    dispatchAppendSibling(position, newCell, siblingId);
    forceUpdate();
  };

  const handleRemoveCell = cell => {
    dispatchRemoveCell(cell);
    forceUpdate();
  };
  return (
    <div>
      {/* render root cell */}
      <div className="flex justify-center">
        {tree?.value?.root && (
          <Cell
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            cell={tree}
            handleAddChild={handleAddChild}
            handleAddSibling={handleAddSibling}
            handleAppendSibling={handleAppendSibling}
          />
        )}
      </div>
      <div className="flex justify-center">
        {tree?.children?.length > 0 &&
          tree.children.map((treeNode, key) => (
            <div
              id={treeNode.value.id}
              key={key}
              className={classNames('flex flex-col items-center relative')}
            >
              <Cell
                activeCell={activeCell}
                setActiveCell={setActiveCell}
                key={key}
                cell={treeNode}
                handleAddChild={handleAddChild}
                handleAppendChild={handleAppendChild}
                handleAddSibling={handleAddSibling}
                handleAppendSibling={handleAppendSibling}
                handleRemoveCell={handleRemoveCell}
              />
              {treeNode.children.length > 0 && (
                <TreeNode
                  nodeWidth={calculateNodeWidth(treeNode.value.id)}
                  id={treeNode.value.id}
                  tree={treeNode}
                  dispatchAddChild={dispatchAddChild}
                  dispatchAppendChild={dispatchAppendChild}
                  dispatchAddSibling={dispatchAddSibling}
                  dispatchRemoveCell={dispatchRemoveCell}
                  dispatchAppendSibling={dispatchAppendSibling}
                />
              )}
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
  dispatchAppendChild: (cell, parentId) => {
    dispatch(appendChild(cell, parentId));
  },
  dispatchAddSibling: cell => {
    dispatch(addSibling(cell));
  },
  dispatchRemoveCell: cell => {
    dispatch(removeCell(cell));
  },
  dispatchAppendSibling: (position, cell, id) => {
    dispatch(appendSibling(position, cell, id));
  }
});

const mapStateToProps = state => {
  const tree = state.tree.tree._root;
  return { tree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
