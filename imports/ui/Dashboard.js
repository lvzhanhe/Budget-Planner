import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddItem from './AddItem';
import Overview from './Overview';
import TransactionList from './TransactionList';

export default () => {
  return (
    <div>
      <PrivateHeader title="My Wallet"/>
      <div className="page-content">
        <div className="left-portion">
          <AddItem/>
          <TransactionList/>
        </div>
        <div className="right-portion">
          <Overview/>
        </div>
      </div>
    </div>
  );
};
