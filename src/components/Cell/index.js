import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IoIosMore } from 'react-icons/io';
import Button from '../Button';
import { getConnectLine } from '../../utils/getPosition';
import { onClickInside } from '../../utils/detectElement';
let classNames = require('classnames');

export const Cell = props => {
  const { name, id, root, position, hasChildren } = props.cell.value;
  const {
    handleAddChild,
    handleAddSibling,
    handleRemoveCell,
    nodeWidth
  } = props;
  const { isEditing, setIsEditing } = props;
  const { activeCell, editing } = isEditing;
  const inputRef = React.createRef();

  useEffect(() => {
    console.log(inputRef.current.value);
    if (document && document.getElementById(`remove${id}`)) {
      //end calculate node width
      document.getElementById(`remove${id}`).addEventListener('click', e => {
        handleRemoveCell(props.cell.value);
        e.stopImmediatePropagation();
      });
    }
    document.getElementById('root').addEventListener('click', e => {
      const clickInside = onClickInside(id, 'root');
      let onClickRemoveBtn;
      if (document && document.getElementById(`remove${id}`)) {
        onClickRemoveBtn = onClickInside(`remove${id}`, 'root');
      }
      if (
        !clickInside ||
        (clickInside && !onClickRemoveBtn && editing === false)
      ) {
        setIsEditing({
          activeCell: undefined,
          editing: false
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, id, setIsEditing]);

  return (
    <div className={classNames(getConnectLine(position))}>
      <div className={classNames('relative')}>
        <div
          className={classNames(
            'cell-width mt-12 h-32 relative flex justify-between'
          )}
        >
          <div
            onClick={() => {
              setIsEditing({
                activeCell: (() => {
                  if (id === activeCell) {
                    return undefined;
                  }
                  if (id !== activeCell) {
                    return id;
                  }
                })(),
                editing: (() => {
                  if (editing === true || activeCell !== id) {
                    return true;
                  }
                  if (editing === true && activeCell === id) {
                    return false;
                  }
                })()
              });
            }}
            className={classNames(
              'border main-border w-56 h-24',
              !root && 'absolute above-line',
              props.cell.children.length > 0 && 'absolute below-line'
            )}
          >
            <div
              className={classNames(
                'flex items-center h-4 w-full main-border-bottom draggable',
                editing && activeCell === id && 'main-bg'
              )}
            >
              <IoIosMore
                className={classNames(
                  'text-4xl font-semibold pl-2',
                  editing && id === activeCell
                    ? 'text-white'
                    : 'main-text-color'
                )}
              />
            </div>
            <div
              ref={inputRef}
              className="relative px-2 py-2 text-xl font-semibold main-text-color"
            >
              {name}
            </div>
          </div>
          {/* only render "add sibling" button for cell not root*/}
          {!root &&
            (activeCell !== id && (
              <div
                className={[
                  'ml-4 opacity-0 hover:opacity-100 flex justify-center w-12 h-32 absolute top-0 right-0'
                ]}
                onClick={() => {
                  handleAddSibling(props.cell.value);
                }}
              >
                <Button name="add" className="absolute z-100" />
              </div>
            ))}
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
          {activeCell === id && editing === true && !root && (
            <div
              id={`remove${id}`}
              className={classNames(
                'absolute bottom-0 right-0 flex justify-center w-56 h-8',
                editing === true && activeCell === id
                  ? 'opacity-1'
                  : 'opacity-0'
              )}
            >
              <Button name="minus" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Cell);
