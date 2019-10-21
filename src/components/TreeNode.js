import React, { useState } from 'react';
import { Cell } from './Cell';
import { connect } from 'react-redux';
import { addChild, addSibling } from '../actions/cell';

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

  const { dispatchAddChild, dispatchAddSibling } = props;
  const handleAddChild = cell => {
    const id = uuidv4();
    let newCell = {
      value: { group: 'body', id: id, name: '...', parentId: cell.id },
      children: []
    };
    dispatchAddChild(newCell);
    forceUpdate();
  };
  const handleAddSibling = cell => {
    const id = uuidv4();

    let newCell = {
      value: { group: 'body', id: id, name: '...', parentId: cell.id },
      children: []
    };
    dispatchAddSibling(newCell);
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
      <div className="flex items-center justify-center">
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
  return { tree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNode);
