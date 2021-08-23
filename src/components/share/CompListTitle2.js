//个人客户详情 基本信息 交易记录-->合同列表 组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import {Link,routerRedux,} from 'dva/router';

import redeemList from '../../styles/trade/redeem.less';

const CompListTitle2 = ({dispatch}) => {

  return (
    <div>
        <section className={redeemList.listTitle2}>
          <div className={redeemList.prodName}>产品名称</div>
          <div className={redeemList.redeemBtn} onClick={() =>dispatch(routerRedux.push({pathname:'/TradeInfoSee',}))} >赎回</div>
        </section>
    </div>
  );
};

export default connect()(CompListTitle2);
