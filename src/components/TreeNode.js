import React from "react";
import { Cell } from "./Cell";
import { connect } from "redux-bundler-react";
const uuidv4 = require("uuid/v4");

const treeObject = [
  {
    te83nwko7b: {
      group: "main",
      id: "te83nwko7b",
      name: "Main page"
    }
  }
  // {
  //   te83nwko7c: {
  //     childIds: [{ 0: "1xzc4ujc2nqi" }],
  //     childIndex: 0,
  //     group: "main",
  //     id: "te83nwko7c",
  //     name: "Page",
  //     parentId: "7nzfir5n5l5"
  //   }
  // }
];
const TreeNode = props => {
  return (
    <div className="flex justify-center items-center">
      {treeObject &&
        treeObject.map((t, key) =>
          Object.entries(t).map((tr, key) => {
            return (
              <Cell
                key={key}
                cell={tr[1]}
                className={tr.id === "te83nwko7b" ? "is-default" : ""}
              />
            );
          })
        )}
    </div>
  );
};
export default connect(TreeNode);
