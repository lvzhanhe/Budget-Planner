import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Items } from '../api/items';
import { Budgets } from '../api/budgets';

export default class BudgetPlanner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      budgets: [],
      amount: ''
    };
  }

  componentDidMount() {
    this.transactionsTracker = Tracker.autorun(() => {
      Meteor.subscribe('items');
      const items = Items.find({}).fetch();
      this.setState({ items });
    });
    this.budgetTracker = Tracker.autorun(() => {
      Meteor.subscribe('budgets');
      const budgets = Budgets.find({}).fetch();
      this.setState({ budgets });
    });
  }

  componentWillUnmount() {
    this.transactionsTracker.stop();
    this.budgetTracker.stop();
  }

  handleAmountChange (e) {
    this.setState({ amount: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    Meteor.call('budgets.update', this.state.amount);
    this.setState({ amount: '' });
  }

  renderBudget() {
    let i = 0;
    let e = 0;
    this.state.items.map((item) => {
      if (item.type === 'income') {
        i = parseFloat(item.amount) + parseFloat(i);
      } else {
        e = parseFloat(item.amount) + parseFloat(e);
      }
    });
    i = i.toFixed(1);
    e = e.toFixed(1);
    let total = (i - e).toFixed(1);
    return (
      <div>
        <h1 className="plan-h1">Overview</h1>
        <div className="plan-content">
          <p>Total Income: {i}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Expenses: {e}</p>
          <p>Total saved: {total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Your Budget Plan: {this.state.budgets.length === 0 ? 0: this.state.budgets[0].amount}</p>
          <input
            className="plan-button"
            type="number"
            placeholder="Your Budget Plan"
            value={this.state.amount}
            onChange={this.handleAmountChange.bind(this)}/>

          <button type="button" onClick={this.onSubmit.bind(this)} className="button button--pill plan-button">Set Plan</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="plan-form">
          {this.renderBudget()}

      </div>
    );
  }
};
