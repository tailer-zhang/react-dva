import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory, } from 'dva/router';
import {fmoney} from '../../../utils/formatUtils';
import styles from "../../../styles/trade/written.less";

const WrittenCompt = (props) => {
  let {data} = props;
  return (
    <div className={styles.itemWrap}>
      <p className={styles.custName}>{data.custName}</p>
      <div>
        <section>
          <p className={styles.number}>{data.origAmt?fmoney(data.origAmt,2):''}<span></span></p>
          <span>预约金额(<i>{data.currTypeName}</i>)</span>
        </section>
        <section>
          <p className={styles.date}>{data.prodTypeName}</p>
          <p className={styles.newSpan}>{data.reqDate}</p>
        </section>
      </div>
		</div>
  );
};
export default connect()(WrittenCompt);
