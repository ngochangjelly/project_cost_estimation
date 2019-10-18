import React from 'react';
import { connect } from 'react-redux';
import TreeNode from './components/TreeNode';

function App() {
  return <TreeNode />;
}

const mapStateToProps = state => {
  const { tree } = state;
  return { tree: tree || undefined };
};

export default connect(mapStateToProps)(App);
