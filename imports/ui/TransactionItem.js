import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class TransactionItem extends React.Component {

  render() {
    return (
      <div className="item">
        <h2>{this.props.item.title}</h2>
        <p className="item__message">{this.props.item.amount}</p>
        <p className="item__message">{this.props.item.detail}</p>
        <p className="item__message">{this.props.item.createTime}</p>
        <button className="button button--pill" onClick={() => {
          Meteor.call('items.delete', this.props.item._id);
        }}>Delete</button>
      </div>
    );
  }
};

TransactionItem.propTypes = {
  item: React.PropTypes.object.isRequired
};
