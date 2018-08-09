import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      type: '',
      detail: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e) {
    const title = this.state.title;
    const amount = this.state.amount;
    const type = this.state.type;
    const detail = this.state.detail;

    e.preventDefault();

    Meteor.call('items.insert', title, amount, detail, type, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  handleTitleChange (e) {
    this.setState({ title: e.target.value });
  }

  handleAmountChange (e) {
    this.setState({ amount: e.target.value });
  }

  handleTypeChange (e) {
    this.setState({ type: e.target.value });

    const obj = this.refs.detail;
    obj.options.length=0;

    const expensesArray = ['Food & Drink', 'Shopping', 'Home', 'Entertainment', 'Travel', 'Education',
          'Healthcare', 'Beauty', 'Work', 'Other'];
    const incomeArray = ['Salary', 'Business', 'Gifts', 'Loan', 'Insurance Payment', 'Other'];

    if (e.target.value === 'expenses') {
      expensesArray.map((expenses) => {
        addOption = new Option(expenses, expenses);
        obj.options.add(addOption);
      });
    } else {
      incomeArray.map((income) => {
        addOption = new Option(income, income);
        obj.options.add(addOption);
      });
    }
  }

  handleDetailChange (e) {
    this.setState({ detail: e.target.value });
  }

  handleModalClose() {
    this.setState({
      title: '',
      amount: '',
      type: '',
      detail: '',
      isOpen: false,
      error: ''
    });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Transaction</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add transaction"
          onAfterOpen={() => this.refs.title.focus()}
          ariaHideApp={false}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Transaction</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                placeholder="What's it for?"
                ref="title"
                value={this.state.title}
                onChange={this.handleTitleChange.bind(this)}/>
              <input
                type="text"
                placeholder="amount (input a number)"
                ref="amount"
                value={this.state.amount}
                onChange={this.handleAmountChange.bind(this)}/>
              <select value={this.state.type} onChange={this.handleTypeChange.bind(this)}>
                <option value="expenses">Expenses</option>
                <option value="income">Income</option>
              </select>
              <select ref='detail'></select>

              <button className="button">Add Transaction</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
