import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class TransactionItem extends React.Component {

  render() {
    return (
      <div className="item">
        <div className="item-left">
          <h1 className="item-title">{this.props.item.type === 'expenses'? '-$' : '+$'}{this.props.item.amount}</h1>
          <p className="item__message">{this.props.item.title}</p>
          <p className="item__message item__message__bottom">{this.props.item.detail}, {this.props.item.createTime}</p>
        </div>
        <div className="item-right">
          <button className="button button--pill" onClick={() => {
            Meteor.call('items.delete', this.props.item._id);
          }}>Delete</button>
        </div>
      </div>
    );
  }
};

TransactionItem.propTypes = {
  item: React.PropTypes.object.isRequired
};
