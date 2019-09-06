import React from "react";
import { Cell } from "./Cell";
import { connect } from "react-redux";
import { addChild } from "../actions/cell";
const uuidv4 = require("uuid/v4");

const TreeNode = props => {
  const { tree } = props;
  const { dispatchAddChild } = props;
  const handleAddChild = cell => {
    dispatchAddChild(cell);
  };
  const handleAddSibling = cell => {};
  return (
    <div className="flex items-center justify-between">
      {tree &&
        tree.map((t, key) =>
          Object.entries(t).map((tr, key) => {
            return (
              <Cell
                key={key}
                cell={tr[1]}
                handleAddChild={handleAddChild}
                handleAddSibling={handleAddSibling}
                className={tr.id === "te83nwko7b" ? "is-default" : ""}
              />
            );
          })
        )}
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatchAddChild: cell => {
    dispatch(addChild(cell));
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
