//B类产品合同详情 赵博文

import React from 'react';
import {connect} from 'dva';
import Title from '../../components/product/Title';
import TradeContractTabs from '../../components/trade/TradeContractTabs';

const tradeSafeContract = ({dispatch,tradeSafe}) => {
  const titleProps = {title: 'B类产品交易详情'};
  return (
    <div>
      <Title {...titleProps} />
      <TradeContractTabs dispatch={dispatch} data={tradeSafe.tradeContractDetail} />
    </div>
  )
}

function connectSafeContract({tradeSafe}) {
  return {tradeSafe}
}

export default connect(connectSafeContract)(tradeSafeContract);
