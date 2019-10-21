import React from 'react';
import { connect } from 'react-redux';
import { IoIosMore } from 'react-icons/io';
import Button from '../Button';
var classNames = require('classnames');

export const Cell = props => {
  const cell = props.cell.value;
  const { name, id, root } = cell;
  const { isEditing, setIsEditing } = props;
  const { activeCell, editing } = isEditing;
  console.log(activeCell);
  return (
    <div>
      <div className="mt-12 w-64 h-32 relative">
        <div
          onClick={() => {
            setIsEditing({ activeCell: id, editing: !editing });
          }}
          className={classNames(
            'border main-border w-56 h-24',
            root ? 'absolute below-line' : 'absolute above-line'
          )}
        >
          <div
            className={classNames(
              'flex items-center h-4 w-full main-border-bottom',
              editing && activeCell === id && 'main-bg'
            )}
          >
            <IoIosMore
              className={classNames(
                'text-4xl font-semibold pl-2',
                editing && id === activeCell ? 'text-white' : 'main-text-color'
              )}
            />
          </div>
          <div className="relative px-2 py-2 text-xl font-semibold main-text-color">
            {name}
          </div>
        </div>
        {/* only render "add sibling" button for cell not root*/}
        {!cell.root &&
          (activeCell !== id && (
            <div
              className={[
                'ml-4 opacity-0 hover:opacity-100 flex justify-center w-12 h-24 absolute top-0 right-0'
              ]}
              onClick={() => {
                props.handleAddSibling(cell);
              }}
            >
              <Button name="add" />
            </div>
          ))}
        {activeCell !== id && (
          <div
            className={[
              'absolute bottom-0 opacity-0 hover:opacity-100 flex justify-center w-56 h-4'
            ]}
            onClick={() => {
              props.handleAddChild(cell);
            }}
          >
            <Button name="add" />
          </div>
        )}
        {activeCell === id && (
          <div
            className={[
              'absolute bottom-0 opacity-0 hover:opacity-100 flex justify-center w-56 h-4'
            ]}
            onClick={() => {
              props.handleAddChild(cell);
            }}
          >
            <Button name="minus" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
