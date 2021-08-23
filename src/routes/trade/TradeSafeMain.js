//B类产品主页 赵博文

import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Badge } from 'antd-mobile';
import Title from '../../components/product/Title';
import styles from '../../styles/customer/customerMain.less';

const TradeSafeMain =　({dispatch,tradeSafe}) => {
  const titleProps = {title: 'B类产品'};
  console.log('tradeSafe=====',tradeSafe);
  let rejectData = tradeSafe.dataTotal;
  let unSubmitData = tradeSafe.unsubTotal;
  if(rejectData==undefined) rejectData = 0;
  if(unSubmitData==undefined) unSubmitData = 0;
  return (
    <div>
      {/*<Title {...titleProps} />*/}
      <div>
        <ul>
          <li className={styles.li} onClick={()=>dispatch(routerRedux.push('/tradeSafeInquire'))}>
            <div className={styles.customer}><img src={require("../../image/icon/customerMain_03.png")} /><span>交易查询</span></div>
            <div className={styles.arrow_r}><img src={require("../../image/icon/arrow_r.png")}/></div>
          </li>
          <li className={styles.li} onClick={()=>dispatch(routerRedux.push('/tradeContractEnter'))}>
            <div className={styles.customer}><img src={require("../../image/trade/x_m_icon_01.png")} /><span>交易录入</span></div>
            <div className={styles.arrow_r}><img src={require("../../image/icon/arrow_r.png")}/></div>
          </li>
          <li className={styles.li} onClick={()=>dispatch(routerRedux.push('/tradeReject'))}>
            <div className={styles.customer}><img src={require("../../image/icon/customerMain_07.png")} /><span>驳回修改</span></div>
            <div className={styles.arrow_r}><Badge text={rejectData==0?'':rejectData} style={{ marginRight: 12 }} /><img src={require("../../image/icon/arrow_r.png")}/></div>
          </li>
          <li className={styles.li} onClick={()=>dispatch(routerRedux.push('/tradeUnsubmitted'))}>
            <div className={styles.customer}><img src={require("../../image/icon/customerMain_07.png")} /><span>未提交</span></div>
            <div className={styles.arrow_r}><Badge text={unSubmitData==0?'':unSubmitData} style={{ marginRight: 12 }} /><img src={require("../../image/icon/arrow_r.png")}/></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

function connectMain({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectMain)(TradeSafeMain);
