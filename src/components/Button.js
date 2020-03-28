import React from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

export default function Button({ name, className, style }) {
  switch (name) {
    case 'add':
      return (
        <IoIosAddCircle
          className="w-8 h-8 text-white z-100 rounded-full bg-white"
          style={{ color: '#2f7fef' }}
        />
      );
    case 'minus':
      return (
        <IoIosRemoveCircle className="w-8 h-8 rounded-full bg-white" style={{ color: 'red' }} />
      );
    default:
      return null;
  }
}
