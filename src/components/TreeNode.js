import React, { useState } from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import { addChild, addSibling, removeCell } from '../actions/cell';

const uuidv4 = require('uuid/v4');

//create your forceUpdate hook
function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}
const TreeNode = props => {
  const forceUpdate = useForceUpdate();
  const { tree } = props;
  const [isEditing, setIsEditing] = useState({
    activeCell: '',
    editing: false
  });

  const { dispatchAddChild, dispatchAddSibling, dispatchRemoveCell } = props;
  const handleAddChild = cell => {
    console.log(cell);
    console.log(cell.parentId);
    console.log(cell.id);
    const id = uuidv4();
    let newCell = {
      value: {
        group: 'body',
        id: id,
        name: 'name',
        parentId: cell.id,
        root: false
      },
      children: []
    };
    dispatchAddChild(newCell);
    forceUpdate();
  };
  const handleAddSibling = cell => {
    const id = uuidv4();

    let newCell = {
      value: { group: 'body', id: id, name: '...', parentId: cell.parentId },
      children: []
    };
    dispatchAddSibling(newCell);
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
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            cell={tree}
            handleAddChild={handleAddChild}
            handleAddSibling={handleAddSibling}
          />
        )}
      </div>
      <div className="flex justify-center">
        {tree?.children?.length > 0 &&
          tree.children.map((treeNode, key) => (
            <div key={key}>
              <Cell
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                key={key}
                cell={treeNode}
                handleAddChild={handleAddChild}
                handleAddSibling={handleAddSibling}
                handleRemoveCell={handleRemoveCell}
              />
              {treeNode.children.length > 0 && (
                <TreeNode
                  tree={treeNode}
                  dispatchAddChild={dispatchAddChild}
                  dispatchAddSibling={dispatchAddSibling}
                  dispatchRemoveCell={dispatchRemoveCell}
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
  dispatchAddSibling: cell => {
    dispatch(addSibling(cell));
  },
  dispatchRemoveCell: cell => {
    dispatch(removeCell(cell));
  }
});

const mapStateToProps = state => {
  const tree = state.tree.tree._root;
  console.log(tree);
  return { tree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
