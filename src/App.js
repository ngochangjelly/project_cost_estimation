import React from 'react';
import TreeNode from './components/TreeNode';
import Header from './components/Header';
import { Estimation } from './components/Estimation/index';
import { connect } from 'react-redux';
let classNames = require('classnames');

const App = props => {
  const { toggleEstimation } = props;
  return (
    <div
      className={classNames('wrapper flex', !toggleEstimation && 'flex-col')}
    >
      <div
        className={classNames([
          toggleEstimation
            ? 'w-1/2 px-8 mt-24 overflow-hidden '
            : 'w-full px-8 mt-24'
        ])}
      >
        <Header />
        <TreeNode toggleEstimation={toggleEstimation} store={props.store} />
      </div>
      {toggleEstimation && (
        <div className="estimation-panel w-1/2 min-h-screen overflow-scroll">
          <Estimation />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state in app component ', state);
  const { toggleEstimation } = state;
  return { toggleEstimation };
};

export default connect(mapStateToProps)(App);
