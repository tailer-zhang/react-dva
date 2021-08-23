//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import styles from '../../styles/customer/customerAdd.less';

const TransList = ({}) => {

  return (
    <div>
      <p className={styles.contractNum}>合同编号：<span>123456789963256</span></p>
      <ul className={styles.transUl}>
        <li>
          <p className={styles.transMoney}>100.00<span></span></p>
          <section>交易金额（人民币）</section>
        </li>
        <li>
        <p className={styles.transTime}>2016-12-12</p>
        <section>签单日期</section>
        </li>
      </ul>
    </div>
  );
};

export default TransList;
