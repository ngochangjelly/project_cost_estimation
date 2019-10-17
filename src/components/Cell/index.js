import React from 'react';
import { connect } from 'react-redux';
import { IoIosMore, IoIosAddCircle } from 'react-icons/io';
import Button from '../Button';

export const Cell = props => {
  const { cell } = props;
  const { name } = cell;
  return (
    <div>
      <div
        className={
          (cell.siblingId && 'bg-primary', 'border main-border w-56 mt-12')
        }
      >
        <div className="flex items-center h-4 w-full main-border-bottom">
          <IoIosMore className="main-text-color text-4xl font-semibold pl-2" />
        </div>
        <div className="relative content min-height px-2 py-2 text-xl font-semibold main-text-color">
          {name}
        </div>
      </div>
      {cell.id !== 'te83nwko7b' && (
        <div className="absolute add-sibling">
          <IoIosAddCircle
            onClick={e => {
              props.handleAddSibling(cell);
            }}
            className="add-sibling-btn text-3xl main-text-color"
          />
        </div>
      )}
      <div
        className={[
          'absolute mt-4 text-center opacity-0 hover:opacity-100 w-12 h-12'
        ]}
        onClick={() => {
          props.handleAddChild(cell);
        }}
      >
        <Button className="w-6 h-6 text-primary" style={{ color: '#2f7fef' }} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
