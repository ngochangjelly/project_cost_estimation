import React from 'react';
import TreeNode from './components/TreeNode';

const App = props => {
  return (
    <div>
      <TreeNode store={props.store} />
    </div>
  );
};

export default App;
