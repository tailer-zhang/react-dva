import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import {fmoney} from '../../utils/formatUtils';

import tradeStyles from '../../styles/trade/trade.less';//样式文件
const XTListItem2 = ({dispatch,item,index}) => {
  return(
    <div className={tradeStyles.eveItem2}>
      <div className={tradeStyles.remitTime}>{item.tradTime}</div>
      <div className={tradeStyles.remitInfoWrap}>
        <div className={tradeStyles.inRemitInfoWrap}>
         {
          // <div className={tradeStyles.serialTitle}>
          //   <p className={tradeStyles.serialNum}>流水号 {item.capiSeq}</p>
          //   <p className={tradeStyles.arrow02}>
          //     <img src={require("../../image/icon/arrow_r.png")} className={tradeStyles.arrow_r_icon}/>
          //   </p>
          // </div>
        }
          <div className={tradeStyles.remittance}>
            <p>
              <span className={tradeStyles.txt1}><strong>{fmoney(item.amount,2)}</strong></span>
              <span>汇款金额(人民币)</span>
            </p>
            <p>
              <span className={tradeStyles.txt2}>{item.custName}</span>
              <span>汇款人</span>
            </p>
          </div>
          <div className={tradeStyles.bank}>
            <p>{item.bankName}|</p>
            <p>{item.lendCardNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default XTListItem2;
