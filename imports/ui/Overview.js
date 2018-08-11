import React from 'react';
import { PieChart } from 'react-d3';
import { Tracker } from 'meteor/tracker';
import { Items } from '../api/items';

export default class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.transactionsTracker = Tracker.autorun(() => {
      Meteor.subscribe('items');
      const items = Items.find({}).fetch();
      console.log(items);
      this.setState({ items });
    });
  }

  componentWillUnmount() {
    this.transactionsTracker.stop();
  }

  renderIncome() {
    let pieData = [];
    this.state.items.map((item) => {
      if (item.type === 'income') {
        let ifVisit = true;
        for (let i = 0; i < pieData.length; i++) {
          let o = pieData[i];
          if (o.label === item.detail) {
            ifVisit = false;
            o.value = parseFloat(o.value) + parseFloat(item.amount);
          }
        }
        if (ifVisit) {
          pieData.push({'label': item.detail, 'value': item.amount});
        }
      }
    });
    let sum = 0;
    for (let j = 0; j < pieData.length; j++) {
      sum += parseFloat(pieData[j].value);
    }
    for (let j = 0; j < pieData.length; j++) {
      pieData[j].value = (parseFloat(pieData[j].value) / sum * 100).toFixed(1);
    }

    return (
      <div className="overview-piechart">
        <PieChart
          data={pieData}
          width={300}
          height={300}
          radius={70}
          innerRadius={13}
          sectorBorderColor="white"
        />
      </div>
    );
  }

  renderExpenses() {
    let pieData = [];
    this.state.items.map((item) => {
      if (item.type === 'expenses') {
        let ifVisit = true;
        for (let i = 0; i < pieData.length; i++) {
          let o = pieData[i];
          if (o.label === item.detail) {
            ifVisit = false;
            o.value = parseFloat(o.value) + parseFloat(item.amount);
          }
        }
        if (ifVisit) {
          pieData.push({'label': item.detail, 'value': item.amount});
        }
      }
    });
    let sum = 0;
    for (let j = 0; j < pieData.length; j++) {
      sum += parseFloat(pieData[j].value);
    }
    for (let j = 0; j < pieData.length; j++) {
      pieData[j].value = (parseFloat(pieData[j].value) / sum * 100).toFixed(1) ;
    }

    return (
      <div className="overview-piechart">
        <PieChart
          data={pieData}
          width={300}
          height={300}
          radius={70}
          innerRadius={13}
          sectorBorderColor="white"
        />
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.renderExpenses()}
        {this.renderIncome()}
      </div>
    );
  }
};
