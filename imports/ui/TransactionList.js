import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Items } from '../api/items';
import TransactionItem from './TransactionItem';

export default class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount Transaction List');
    this.transactionsTracker = Tracker.autorun(() => {
      Meteor.subscribe('items');
      const items = Items.find({}).fetch();
      this.setState({ items });
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.transactionsTracker.stop();
  }

  renderTransactionItems() {
    if (this.state.items.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Transaction Yet</p>
        </div>
      );
    }

    return this.state.items.map((item) => {
      return <TransactionItem key={item._id} item={item}/>;
    });
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderTransactionItems()}
        </FlipMove>
      </div>
    );
  }
};
