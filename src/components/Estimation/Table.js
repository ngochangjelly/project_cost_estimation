import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { FaEllipsisV } from 'react-icons/fa';

class Table extends React.Component {
  constructor(props) {
    super(props);

    const data = [];
    for (let i = 1, len = 7; i < len; i++) {
      data.push({
        title: `rows${i}`,
        rate: 0,
        hour: 0,
        amount: 0
      });
    }

    this.state = {
      data
    };
  }

  render() {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const data = that.state.data;
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({ data });
      },
      nodeSelector: 'li',
      handleSelector: 'a'
    };

    return (
      <div className="w-full">
        <ReactDragListView {...dragProps}>
          <ol className="w-full">
            {this.state.data.map((item, index) => (
              <li className="text-white flex estimation-row" key={index}>
                <div className="w-1/4">{item.title}</div>
                <div className="w-1/4">{item.title}</div>
                <div className="w-1/4">{item.title}</div>
                <div className="w-1/4">{item.title}</div>
                <a href="#">
                  <FaEllipsisV className="block" />
                </a>
              </li>
            ))}
          </ol>
        </ReactDragListView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { toggleEstimation } = state;
  return { toggleEstimation };
};

export default connect(mapStateToProps)(Table);
