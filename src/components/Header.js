import React from 'react';
import { connect } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';

const Header = props => {
  const { toggleEstimation, setToggleEstimation } = props;
  function handleClick() {
    setToggleEstimation(toggleEstimation=>!toggleEstimation)
  }
  return (
    <div className="flex justify-start">
      <button
        onClick={handleClick}
        className={["w-12 h-12 bg-button flex justify-center items-center"]}
      >
        <FaDollarSign />
      </button>
    </div>
  );
};


export default connect(
)(Header);
