import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IoIosMore } from 'react-icons/io';
import Button from '../Button';
import { getConnectLine } from '../../utils/getPosition';
let classNames = require('classnames');

// create your forceUpdate hook
function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}
export const Cell = props => {
  const forceUpdate = useForceUpdate();
  const { name, id, root, position } = props.cell.value;
  const {
    handleAddChild,
    handleAddSibling,
    handleRemoveCell,
    handleAppendChild,
    handleAppendSibling
  } = props;
  const { activeCell, setActiveCell } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [onHover, setOnHover] = useState(null);
  const inputRef = React.createRef();
  const dragStart = (event, cell) => {
    setIsDragging(true);
    event.dataTransfer.setData('cell', JSON.stringify(cell));
  };
  const allowDrop = event => {
    const currentArea = event.target.getAttribute('id');
    let id;
    if (currentArea.includes('sibling-dropzone')) {
      setOnHover(currentArea);
    }
    event.preventDefault();
  };
  const handleDragLeave = event => {
    const currentArea = event.target.getAttribute('id');
    let id;
    if (currentArea.includes('sibling-dropzone')) {
      id =
        currentArea.replace(/right-sibling-dropzone-/g, '') ||
        currentArea.replace(/left-sibling-dropzone-/g, '');
      setOnHover(null);
    }
  };

  const drop = (event, data) => {
    event.preventDefault();
    var data = event.dataTransfer.getData('cell');
    data = JSON.parse(data);
    let cellId = event.target.getAttribute('id');
    if (event.target.getAttribute('name') === 'right-sibling-dropzone') {
      event.target.style.className = 'is-dragging';
      cellId = cellId.replace(/right-sibling-dropzone-/g, '');
      handleAppendSibling('right', data, cellId);
      //remove dropzone transition on hover css
      const cellsCollection = document.getElementsByClassName('cell');
      let cellArr = [...cellsCollection];
      cellArr.map(v => {
        v.classList.remove('on-right-dragged-over', 'on-left-dragged-over');
      });
    }
    if (event.target.getAttribute('name') === 'left-sibling-dropzone') {
      cellId = cellId.replace(/left-sibling-dropzone-/g, '');
      handleAppendSibling('left', data, cellId);
    }
    setIsDragging(false);
    setOnHover(null);
    forceUpdate();
  };
  const handleActive = e => {
    const currentId = e.target.getAttribute('id');
    if (currentId.includes(id)) {
      if (!activeCell) {
        setActiveCell(id);
      }
      if (activeCell) {
        setActiveCell(null);
      }
      if (activeCell !== id) {
        setActiveCell(id);
      }
    }
  };

  return (
    <div className={classNames(getConnectLine(position))}>
      <div className={classNames('relative')}>
        <div
          className={classNames(
            'cell cell-width mt-12 h-32 flex justify-center relative',
            onHover?.includes(id) &&
              onHover?.includes('right') &&
              'on-right-dragged-over',
            onHover?.includes(id) &&
              onHover?.includes('left') &&
              'on-left-dragged-over'
          )}
        >
          {!root && (
            <div
              className={classNames(
                'w-24 h-32 left-dz bg-red absolute left-0 top-0 dropzone bg-gray-100'
              )}
              name="left-sibling-dropzone"
              id={`left-sibling-dropzone-${id}`}
              onDrop={e => drop(e, props.cell)}
              onDragOver={e => allowDrop(e)}
            ></div>
          )}
          <div
            id={id}
            className={classNames(
              'border main-border rounded-lg  w-56 h-24',
              !root && 'absolute above-line',
              props.cell.children.length > 0 && 'absolute below-line'
            )}
            onDragStart={e => dragStart(e, props.cell)}
            draggable={!root && 'true'}
          >
            <div
              className={classNames(
                'flex items-center h-4 w-full main-border-bottom',
                !root && 'draggable',
                activeCell === id && 'main-bg'
              )}
            >
              <IoIosMore
                className={classNames(
                  'text-4xl font-semibold pl-2',
                  id === activeCell ? 'text-white' : 'main-text-color'
                )}
              />
            </div>
            <div
              ref={inputRef}
              className="relative px-2 py-2 text-xl font-semibold main-text-color"
              id={`edit-${id}`}
              onClick={e => handleActive(e)}
            >
              {name}
            </div>
          </div>
          {/* only render "add sibling" button for cell not root*/}
          {!root &&
            (activeCell !== id && (
              <div
                className={[
                  'absolute opacity-0 hover:opacity-100 flex justify-center w-12 h-32 top-0 right-0'
                ]}
                onClick={() => {
                  handleAddSibling(props.cell.value);
                }}
              >
                <Button name="add" className="absolute" />
              </div>
            ))}
          {!root && (
            <div
              className={classNames(
                'w-24 h-32 right-dz bg-red absolute top-0 right-0 dropzone bg-gray-100'
              )}
              name="right-sibling-dropzone"
              id={`right-sibling-dropzone-${id}`}
              onDrop={e => drop(e, props.cell)}
              onDragOver={e => allowDrop(e)}
              onDragLeave={e => handleDragLeave(e)}
            ></div>
          )}
          {activeCell !== id && (
            <div
              className={[
                'absolute bottom-0 opacity-0 hover:opacity-100 flex justify-center w-56 h-8'
              ]}
              onClick={() => {
                handleAddChild(props.cell.value);
              }}
            >
              <Button name="add" className="absolute z-100" />
            </div>
          )}
          {/* toggle remove button on hover cell but not the root cell */}
          {activeCell === id && !root && (
            <div
              id={`remove${id}`}
              className={classNames(
                'absolute bottom-0 right-0 flex justify-center w-56 h-8',
                activeCell === id ? 'opacity-1' : 'opacity-0'
              )}
              onClick={() => {
                handleRemoveCell(props.cell.value);
              }}
            >
              <Button id={`remove${id}`} name="minus" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
