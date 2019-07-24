import React from "react";
const Cell = () => {
  return (
    <div className="Cell">
      <div className="Cell-handle">
        <span />
        <span />
        <span />
      </div>
      <div className="Cell-content">content</div>
      <div className="Cell-children">
        <div className="Cell-plus" />
      </div>
    </div>
  );
};
export default Cell;
