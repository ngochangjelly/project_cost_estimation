import React from "react";
// similar to react-redux
// bindings available for React and Preact
import TreeNode from "./components/TreeNode";

function App() {
  return (
    <div className="App">
      <div className="App-canvas">
        <div className="Tree">
          <div className="Tree-root">
            <div className="Tree-main">
              <div className="Tree-branch">
                <TreeNode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
