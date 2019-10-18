import React from 'react';
import { connect } from 'react-redux';
import { IoIosMore } from 'react-icons/io';
import Button from '../Button';

export const Cell = props => {
  const cell = props.cell.value;
  const { name, id, root } = cell;
  return (
    <div>
      <div className="mt-12 w-64 h-32 relative">
        <div
          className={
            (cell.siblingId && 'bg-primary', 'border main-border w-56 h-24')
          }
        >
          <div className="flex items-center h-4 w-full main-border-bottom">
            <IoIosMore className="main-text-color text-4xl font-semibold pl-2" />
          </div>
          <div className="relative px-2 py-2 text-xl font-semibold main-text-color">
            {id}
          </div>
        </div>
        {/* only render "add sibling" button for cell not root */}
        {!cell.root && (
          <div
            className={[
              'ml-4 opacity-0 hover:opacity-100 flex justify-center w-12 h-24 absolute top-0 right-0'
            ]}
            onClick={() => {
              props.handleAddSibling(cell);
            }}
          >
            <Button />
          </div>
        )}
        <div
          className={[
            'absolute bottom-0 opacity-0 hover:opacity-100 flex justify-center w-56'
          ]}
          onClick={() => {
            props.handleAddChild(cell);
          }}
        >
          <Button />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
