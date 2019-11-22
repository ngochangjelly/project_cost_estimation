import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const Tick = props => {
  const { activated, index, color } = props;
  return (
    <div>
      {!activated && <FaRegCheckCircle color={[activated ? color : '']} />}
      {activated && (
        <IoIosCheckmarkCircle
          className="text-xl"
          color={[activated ? color : '']}
        />
      )}
    </div>
  );
};
export default Tick;
