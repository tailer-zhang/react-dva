import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux, } from 'dva/router';
import tradeStyles from '../../styles/trade/trade.less';//样式文件

import remitStyle from '../../styles/trade/redeem.less';
import styles from '../../styles/customer/customerAdd.less';

const CapiInfo = ({dispatch,item,index}) => {
  // console.log('kkkkkkkkkkkkkkkk``````````````',item,index);
  return (
    <div className={styles.remit} style={{marginBottom:'0px',borderBottom:'1px solid #dcdcdc'}}>
      <section className={styles.remitTime}> <p>{item.tradDate} </p> </section>
      <div className={styles.remitCard}>
        {
          // <p className={styles.contractNum}>流水号<span>{item.capiSeq}</span></p>
        }
         <ul className={styles.transUl}>
           <li>
             <p className={styles.transMoney}>{item.amt}<span>万</span></p>
             <section>汇款金额（人民币）</section>
           </li>
           <li>
             <p>{item.remitUser}</p>
             <section>汇款人</section>
           </li>
         </ul>
         <section className={styles.bankType}><span>{item.bankType}</span>  <span>{item.bankNum}</span></section>
      </div>
		</div>
  );
};
export default connect()(CapiInfo);
