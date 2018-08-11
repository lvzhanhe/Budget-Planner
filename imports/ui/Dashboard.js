import React from 'react';

import PrivateHeader from './PrivateHeader';
import Overview from './Overview';
import TransactionList from './TransactionList';
import BudgetPlanner from './BudgetPlanner';

export default () => {
  return (
    <div>
      <PrivateHeader title="My Wallet"/>
      <div className="page-content">
        <div className="left-portion">
          <TransactionList/>
        </div>
        <div className="right-portion">
          <div><BudgetPlanner/></div>
          <div className="overview-box"><Overview/></div>
        </div>
      </div>
    </div>
  );
};
