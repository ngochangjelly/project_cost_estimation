import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const Tick = props => {
  const { activated, index, color } = props;
  return (
    <div>
      <FaRegCheckCircle color={color} />
    </div>
  );
};
export default Tick;
