import React from 'react';
import { connect } from 'react-redux';
import { FaDollarSign, FaFilePdf, FaDownload, FaFileDownload } from 'react-icons/fa';
import print from '../utils/convertToPdf';

const Header = props => {
  const { toggleEstimation, setToggleEstimation } = props;
  function handleClick() {
    setToggleEstimation(toggleEstimation=>!toggleEstimation)
  }
  return (
    <div className="flex justify-start">
      <button
        onClick={handleClick}
        className={["w-12 h-12 bg-button flex justify-center items-center mr-4"]}
      >
        <FaDollarSign />
      </button>
      <button
        onClick={()=>print(1, 'root')}
        className={["w-12 h-12 bg-button flex justify-center items-center"]}
      >
        <FaFileDownload />
      </button>
    </div>
  );
};


export default connect(
)(Header);
