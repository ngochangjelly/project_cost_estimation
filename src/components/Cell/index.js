import React from "react";
import { connect } from "react-redux";
import { IoIosMore } from "react-icons/io";

export const Cell = props => {
  const { cell } = props;
  const { name } = cell;
  console.log(cell);
  const handleAddChildren = cell => {
    console.log("enter add children");
  };
  const handleAddSibling = cell => {
    console.log("enter add sibling");
  };
  return (
    <div>
      <div className="border border-blue-500 w-56 mb-4 mt-12">
        <div className="handler bg-blue-500 w-full">
          <span />
          <IoIosMore className="text-white text-3xl" />
        </div>
        <div className="content border border-blue-500">{name}</div>
        <div className="Cell-sibling">
          <div
            className="Cell-plus"
            onClick={e => handleAddSibling(cell)}
          ></div>
        </div>
        <div className="Cell-children">
          <div className="Cell-plus" onClick={e => handleAddChildren(cell)} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
