//风险承受能力；
import React,{ Component,PropTypes } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import NewAssButton from '../../components/share/NewAssButton';
import AssessBanner from '../../components/share/AssessBanner';
import RiskGradeList from '../../components/share/RiskGradeList';
import {processScoreData,processOrgScoreData} from '../../services/customer';
import RiskResult  from '../../components/customer/RiskResult';

import riskStyles from '../../styles/customer/riskBear.less';


const RiskAssess = ({dispatch,location,formStorage}) =>{
  let {custID,riskLevel,score} =  formStorage.riskResult;
  let {custClass} = location.state;
  let {proCustomer} = location.query;
  const TitleProp = {title:'风险承受能力评估'};
  let dataChart;
  if(custClass=='01')
    dataChart = processScoreData(score);
  else dataChart = processOrgScoreData(score);
  return (
    <div className={riskStyles.riskAssBox}>
        <Title  {...TitleProp}/>
        <RiskResult score={score} dataChart={dataChart} riskLevel={riskLevel} proCustomer={proCustomer}/>
        <div className={riskStyles.assBoxBtn}>
          <NewAssButton onClick={()=>{
            dispatch(routerRedux.push({
              pathname: '/riskBearSec',
              state: {custID:custID}
            }));
          }}/>
        </div>
    </div>
  );
};

function connectStateForm({formStorage})
{
  return {formStorage};
}

export default connect(connectStateForm)(RiskAssess);
