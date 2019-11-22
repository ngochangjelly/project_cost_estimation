import React, { useRef, useEffect } from 'react';

export const Input = ({ id, title, className, type, placeholder }) => {
  const node = useRef();
  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      console.log('outside');

      return;
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={node}>
      <input
        id={id}
        className={className}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
