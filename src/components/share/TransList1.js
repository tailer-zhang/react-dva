
import React, { Component,PropTypes } from 'react';

import styles from '../../styles/customer/customerAdd.less';

const TransList1 = (props) => {
  const { prodName,contractNum, transMoney,tradeUnit,userName,userTitle } = props;
  return (
    <div className={styles.userInfo}>
      <p className={styles.contractNum}>{prodName}<span>{contractNum}</span></p>
      <ul className={styles.transUl}>
        <li>
          <p className={styles.transMoney}>{transMoney}<span></span></p>
          <section>{tradeUnit}</section>
        </li>
        <li>
        <p>{userName}</p>
        <section>{userTitle}</section>
        </li>
      </ul>
    </div>
  );
};

export default TransList1;
