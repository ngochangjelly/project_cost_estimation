import React from "react";
import Cell from "./Cell/index";
const TreeNode = () => {
  return (
    <div className="Tree-node">
      <div className="Tree-item"  draggable="false">
        <Cell />
      </div>
    </div>
  );
};
export default TreeNode;
