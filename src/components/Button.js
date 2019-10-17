import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';

export default function Button({ className, style }) {
  return (
    <IoIosAddCircle
      className="w-6 h-6 text-primary"
      style={{ color: '#2f7fef' }}
    />
  );
}
