// //风险承受能力banner组件
import React,{ Component,PropTypes } from 'react';

import riskStyles from '../../styles/customer/riskBear.less';

const RiskGradeList = ({}) =>{

  return(
    <div className={riskStyles.pieChart}>
      <div className={riskStyles.pieChartDes}>
        <span></span>
        <p className={riskStyles.txt_04}>高风险：PE,VC,新三版块</p>
      </div>
      <div className={riskStyles.pieChartDes}>
        <span className={riskStyles.color_01}></span>
        <p className={riskStyles.txt_04}>中高风险：并购基金,量化FOF,定增基金,二级市场</p>
      </div>
      <div className={riskStyles.pieChartDes}>
        <span className={riskStyles.color_02}></span>
        <p className={riskStyles.txt_04}>中风险：信托,类固收产品,房地产基金,CTA基金</p>
      </div>
      <div className={riskStyles.pieChartDes} style={{marginBottom:'74px'}}>
        <span className={riskStyles.color_03}></span>
        <p className={riskStyles.txt_04}>低风险：货币基金,债券基金,B类产品</p>
      </div>
    </div>
  );
}

export default RiskGradeList;
