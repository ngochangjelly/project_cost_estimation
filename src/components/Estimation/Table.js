import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { FaEllipsisV } from 'react-icons/fa';
import * as table from '../../constant/estimationTable';
import { arrangeRow } from '../../actions/estimation';
let classNames = require('classnames');

class Table extends React.Component {
  constructor(props) {
    super(props);

    const data = this.props.estimation;

    this.state = {
      data
    };
  }

  onDragEnd = (fromIndex, toIndex) => {
    const data = this.state.data;
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);
    this.setState({ data });
  };

  dragProps = {
    onDragEnd: this.onDragEnd,
    nodeSelector: 'li',
    handleSelector: 'a'
  };
  handleAddRow = () => {};

  render() {
    return (
      <div className="w-full">
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
            {this.state.data.map((item, index) => (
              <li className="text-white flex estimation-row h-16" key={index}>
                <div className="w-1/4 border grey-border">{item.title}</div>
                <div className="w-1/4 border grey-border">{item.title}</div>
                <div className="w-1/4 border grey-border">{item.title}</div>
                <div className="w-1/4 border grey-border flex justify-between items-center">
                  {item.title}
                  <a>
                    <FaEllipsisV />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </ReactDragListView>
        <div
          onClick={() => this.handleAddRow}
          className="primary-grey h-16 flex justify-start items-center border-b grey-border"
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
  }
});
const mapStateToProps = state => {
  const { estimation } = state;
  return { estimation };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
