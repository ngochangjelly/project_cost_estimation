import React from 'react';
import TreeNode from './components/TreeNode';

const App = props => {
  return (
    <div className="wrapper mt-24">
      <br />
      <div>
        <TreeNode store={props.store} />
      </div>
    </div>
  );
};

export default App;
