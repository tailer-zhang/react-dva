//风险承受能力banner组件
import React,{ Component,PropTypes } from 'react';

import riskStyles from '../../styles/customer/riskBear.less';

const AssessBanner = ({}) =>{

  return(
    <div className={riskStyles.AssBnerComp}>
      <ul>
        <li>
          <p className={riskStyles.BnerCompP}>风险等级<span>稳健性</span></p>
        </li>
        <li>
          <p>资产配置得分<span>10</span></p>
        </li>
      </ul>
      <img src={require("../../image/customer/progress_01.png")}/>
    </div>

  );
}

export default AssessBanner;
