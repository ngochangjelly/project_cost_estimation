import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { FaEllipsisV } from 'react-icons/fa';
import * as table from '../../constant/estimationTable';
import { arrangeRow, addRow, removeRow } from '../../actions/estimation';
let classNames = require('classnames');

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.state = {
      parentId: ''
    };
    this.setState = this.setState.bind(this);
  }
  handleAddRow = id => {
    this.props.dispatchAddRow(id);
  };
  handleRemoveRow = row => {
    if (window.confirm('Confirm removing row?')) {
      row && this.props.dispatchRemoveRow(row);
      this.forceUpdate();
    }
  };
  componentDidMount() {
    document
      .getElementById('estimationTable')
      .addEventListener('keypress', e => {
        var key = e.which || e.keyCode;
        if (key === 13) {
          const id = e.target.getAttribute('id').replace(/input-/g, '');
          this.handleAddRow(id);
        }
      });
  }
  onDragEnd = (fromIndex, toIndex) => {
    const data = this.props.estimation;
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);
    this.props.dispatchArrangeRow(data);
  };

  dragProps = {
    onDragEnd: this.onDragEnd,
    nodeSelector: 'li',
    handleSelector: 'a'
  };

  render() {
    return (
      <div id="estimationTable" className="w-full">
        <ReactDragListView {...this.dragProps}>
          <div className="w-full flex">
            {table.head.map((h, key) => (
              <div
                className={classNames([
                  `w-1/${table.head.length}`,
                  'primary-grey mb-6 font-semibold'
                ])}
                key={key}
              >
                {h}
              </div>
            ))}
          </div>
          <ol className="w-full">
            {this.props.estimation.map((item, index) => (
              <li className="text-white flex estimation-row h-16" key={index}>
                <div className="flex items-center w-1/4 border grey-border">
                  <a
                    className="-ml-3 mr-3 cursor-pointer"
                    onClick={() => this.handleRemoveRow(item)}
                  >
                    <div className="bg-red-700 rounded-full w-6 h-6 text-white text-xl flex justify-center items-center">
                      -
                    </div>
                  </a>
                  <input
                    id={`input-${item.id}`}
                    className="w-full h-full bg-transparent focus:outline-none"
                    type="text"
                    placeholder={item.title}
                  />
                </div>
                <div className="w-1/4 border grey-border">
                  <input
                    className="w-full h-full bg-transparent focus:outline-none focus:bg"
                    type="text"
                    placeholder={`$${item.rate}`}
                  />
                </div>
                <div className="w-1/4 border grey-border">
                  <input
                    className="w-full h-full bg-transparent focus:outline-none focus:bg"
                    type="text"
                    placeholder={item.hours}
                  />
                </div>
                <div className="w-1/4 border grey-border flex justify-between items-center">
                  <input
                    className="w-full h-full bg-transparent focus:outline-none focus:bg"
                    type="text"
                    placeholder={item.amount}
                  />
                  <a>
                    <FaEllipsisV />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </ReactDragListView>
        <div
          onClick={() => {
            this.handleAddRow();
          }}
          className="primary-grey h-16 flex justify-start items-center border-b grey-border cursor-pointer"
        >
          Add row
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatchArrangeRow: data => {
    dispatch(arrangeRow(data));
  },
  dispatchAddRow: id => {
    dispatch(addRow(id));
  },
  dispatchRemoveRow: row => {
    dispatch(removeRow(row));
  }
});
const mapStateToProps = state => {
  const { estimation } = state;
  return { estimation };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
