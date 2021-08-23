//驳回修改 赵博文

import React from 'react';
import {connect} from 'dva';
import TradeUnsubmittedList from '../../components/trade/TradeUnsubmittedList';

const TradeUnsubmitted = ({tradeSafe,dispatch}) => {
  console.log('=====tradeSafe',tradeSafe);
  const titleProps = {title: 'B类产品驳回修改'};
  return (
    <div style={{height: '100%',backgroundColor: '#f7f7f7'}}>
      {/*<Title {...titleProps}/>*/}
      <div style={{position:'absolute',left:0,right:0,bottom:0,top:0,overflow:'auto'}}>
        <TradeUnsubmittedList dataSource = {tradeSafe} dispatch={dispatch} />
      </div>
    </div>
  )
}

function connectTradeUnsubmitted({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectTradeUnsubmitted)(TradeUnsubmitted);
