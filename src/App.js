import React from 'react';
import TreeNode from './components/TreeNode';

const App = props => {
  return (
    <div className="wrapper mt-24">
      <TreeNode store={props.store} />
    </div>
  );
};

export default App;
