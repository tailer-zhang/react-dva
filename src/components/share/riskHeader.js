//风险承受评估头部组件
import React ,{ Component,PropTypes } from 'react';
import { Link } from 'dva/router';
import  riskBearStyles  from '../../styles/customer/riskBear.less';

const RiskHeader = ({header}) => {
  const headerText = {
    value:'风险承受能力评估',
  };
  return (
    <div className={riskBearStyles.riskHeader}>
        <div className={riskBearStyles.riskBack}><img src={require("../../image/icon/back_01.png")}/></div>
        <div className={riskBearStyles.headerText}>{headerText.value}</div>
    </div>
  )
}

export default RiskHeader;
