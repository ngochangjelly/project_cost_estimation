import React from 'react';
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io';

export default function Button({ name, className, style }) {
  switch (name) {
    case 'add':
      return (
        <IoIosAddCircle
          className="w-12 h-12 text-white z-100"
          style={{ color: '#2f7fef' }}
        />
      );
    case 'minus':
      return (
        <IoIosRemoveCircle className="w-12 h-12" style={{ color: 'red' }} />
      );
    default:
      return null;
  }
}
