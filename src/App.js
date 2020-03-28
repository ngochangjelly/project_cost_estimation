import React, {useState} from 'react';
import TreeNode from './components/TreeNode';
import Header from './components/Header';
import { Estimation } from './components/Estimation/index';
import { connect } from 'react-redux';
let classNames = require('classnames');

const App = props => {
  const [toggleEstimation, setToggleEstimation] = useState(true)
  return (
    <div
      className={classNames('wrapper flex relative overflow-scroll', 'flex-col')}
    >
      <div
        className={classNames([
          'w-full z-0 px-8 mt-24',
        ])}
      >
        <Header setToggleEstimation={setToggleEstimation}/>
        <TreeNode toggleEstimation={toggleEstimation} store={props.store} />
      </div>
      {!toggleEstimation && <div onClick={()=>setToggleEstimation(toggleEstimation=>!toggleEstimation)} className="bg-gray-700 opacity-50 min-h-screen min-w-screen z-100 absolute top-0 left-0 right-0 bottom-0"></div>}
      {!toggleEstimation && (
        <div className="estimation-panel w-1/2 min-h-screen overflow-scroll fixed right-0 top-0 bottom-0">
          <Estimation setToggleEstimation={setToggleEstimation} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
};

export default connect(mapStateToProps)(App);
