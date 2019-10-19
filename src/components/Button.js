import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';

export default function Button({ className, style }) {
  return (
    <IoIosAddCircle
      className="w-8 h-8 text-primary"
      style={{ color: '#2f7fef' }}
    />
  );
}
