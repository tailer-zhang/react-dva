//驳回修改 赵博文

import React from 'react';
import {connect} from 'dva';
// import { browserHistory } from 'dva/router';
import Title from '../../components/product/Title';
import TradeRejectList from '../../components/trade/TradeRejectList';

const TradeReject = ({tradeSafe,dispatch}) => {
  console.log('=====tradeSafe',tradeSafe);
  const titleProps = {title: 'B类产品驳回修改'};
  return (
    <div style={{height: '100%',backgroundColor: '#f7f7f7'}}>
      {/*<Title {...titleProps}/>*/}
      <div style={{position:'absolute',left:0,right:0,bottom:0,top:0,overflow:'auto'}}>
        <TradeRejectList dataSource = {tradeSafe} dispatch={dispatch} />
      </div>
    </div>
  )
}

function connectTradeReject({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectTradeReject)(TradeReject);
