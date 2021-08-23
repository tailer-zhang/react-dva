//风险承受 问题组件
import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';

import riskBearStylkes from '../../styles/customer/riskBear.less';

const RiskQuestion = ({header,data,index}) => {
  return (
    <div className={riskBearStylkes.question}>
        <p className={riskBearStylkes.questionNum}>
          <span>{data[index]==undefined?'':data[index].questionNo}
          </span>/{data.length}
        </p>
        <p className={riskBearStylkes.questionTitle}>
          {data[index]==undefined?'':data[index].questionName}
        </p>
    </div>
  );
}

export default RiskQuestion;
