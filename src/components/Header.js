import React from 'react';
import { connect } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';
import { toggleEstimation } from '../actions/toggleEstimation';

const Header = props => {
  const { toggleEstimation } = props;
  const { dispatchToggleEstimation } = props;
  function handleClick() {
    if (!toggleEstimation) {
      dispatchToggleEstimation(true);
    } else {
      dispatchToggleEstimation(false);
    }
  }
  return (
    <div className="flex justify-end">
      <button
        onClick={() => handleClick()}
        className="w-12 h-12 bg-button flex justify-center items-center"
      >
        <FaDollarSign />
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchToggleEstimation: isOpen => {
    dispatch(toggleEstimation(isOpen));
  }
});
const mapStateToProps = state => {
  const toggleEstimation = state.toggleEstimation;
  return { toggleEstimation };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
