import React, { useState, useRef, useMemo } from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import useOnClickOutside from '../hooks/onClickOutside';
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
  const [_, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}

const calculateNodeWidth = id => {
  return id && document?.getElementById(id)?.offsetWidth;
};
const TreeNode = props => {
  const forceUpdate = useForceUpdate();
  const { tree, toggleEstimation } = props;
  const { estimation } = props;
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
  const cellRef = useRef(null);
  const childCellRef = useRef(null);
  const handleActive = e => {
    const currentId = e.target.getAttribute('id');
    if (currentId) {
      if ( activeCell !== currentId) {
        setActiveCell(currentId);
      }
        setActiveCell(null);
    }
  };

  return (
    <div className={classNames(['flex flex-col flex-wrap',!toggleEstimation && 'pointer-events-none'])} id="canvas">
      {/* render root cell */}
      <div className="flex justify-center">
        {tree?.value?.root && (
          <Cell
            ref={cellRef}
            handleActive={handleActive}
            toggleEstimation={toggleEstimation}
            activeCell={activeCell}
            setActiveCell={(obj)=>setActiveCell(obj)}
            cell={tree}
            estimation={estimation}
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
                  handleActive={handleActive}
                  ref={childCellRef}
                  toggleEstimation={toggleEstimation}
                  estimation={estimation}
                  activeCell={activeCell}
                  setActiveCell={(obj)=>setActiveCell(obj)}
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
                  toggleEstimation={toggleEstimation}
                  estimation={estimation}
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
  const estimation = state.estimation;
  return { tree, estimation };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);
