import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import { Items } from '../api/items';
import TransactionItem from './TransactionItem';
import AddItem from './AddItem';

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
          <p className="empty-item">Add a New Transaction to Start</p>
      );
    }

    return this.state.items.map((item) => {
      return <TransactionItem key={item._id} item={item}/>;
    });
  }

  render() {
    return (
      <div className="item-list">
        <AddItem/>
        <FlipMove maintainContainerHeight={true}>
          {this.renderTransactionItems()}
        </FlipMove>
      </div>
    );
  }
};
