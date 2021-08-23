import React from 'react';
import styles from '../../styles/trade/tradeRejectCause.less';

const TradeRejectCause = ({data}) => {
  let insurModel = data.insurModel;
  if(insurModel == undefined) insurModel = {};
  return(
    <div className={styles.total}>
      <div className={styles.cause}>
        <span>驳回原因</span><em>{insurModel.noPassReason}</em>
      </div>
      <div className={styles.time}>
        <span>审批时间</span><em>{insurModel.appTime}</em>
      </div>
      <div className={styles.oparate}>
        <span>操作人</span><em>{insurModel.appUserName}</em>
      </div>
    </div>
  )
}

export default TradeRejectCause;
