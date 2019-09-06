import React from "react";
import { connect } from "react-redux";
import { IoIosMore, IoIosAddCircle } from "react-icons/io";

export const Cell = props => {
  const { cell } = props;
  const { name } = cell;
  return (
    <div>
      <div className="border main-border w-56 mt-12">
        <div className="flex items-center h-4 w-full main-border-bottom">
          <IoIosMore className="main-text-color text-4xl font-semibold pl-2" />
        </div>
        <div className="relative content min-height px-2 py-2 text-xl font-semibold main-text-color">
          {name}
        </div>
      </div>
      {cell.id !== "te83nwko7b" && (
        <div className="absolute add-sibling">
          <IoIosAddCircle
            onClick={e => {
              props.handleAddSibling();
            }}
            className="add-sibling-btn text-3xl main-text-color"
          />
        </div>
      )}
      <div className="absolute w-56 add-child flex justify-center">
        <IoIosAddCircle
          onClick={e =>
            props.handleAddChild({
              te83nwko7b: {
                group: "main",
                id: "ee83nwko7b",
                name: "second page"
              }
            })
          }
          className="add-child-btn text-3xl main-text-color"
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
