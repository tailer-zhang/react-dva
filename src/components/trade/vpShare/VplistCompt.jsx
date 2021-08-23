import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory, } from 'dva/router';
import {fmoney} from '../../../utils/formatUtils';
import styles from '../../../styles/trade/vpShare/vplist.less';

const VplistCompt = (props) => {
  let {data} = props;
  return (
    <div className={styles.itemWrap}>
      <p className={styles.prodName}>{data.prodName}</p>
      <div>
        <section>
          <p className={styles.number}>{data.totAmt}<span>万</span></p>
          <span>共享额度</span>
        </section>
        <section>
          <p className={styles.date}>{data.useableAmt}<span>万</span></p>
          <span>剩余共享额度</span>
        </section>
      </div>
		</div>
  );
};
export default VplistCompt;
