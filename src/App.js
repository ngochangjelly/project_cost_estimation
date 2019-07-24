import React from "react";
import TreeNode from "./components/TreeNode";
import "./App.css";
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
