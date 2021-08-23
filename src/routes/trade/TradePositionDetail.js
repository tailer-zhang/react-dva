//客户持仓详情 赵博文

import React from 'react';
import {connect} from 'dva';
import Title from '../../components/product/Title';
import TradePositionTabs from '../../components/trade/TradePositionTabs';

const TradePositionDetail = (props) => {
  const titleProps = {title: '客户持仓详情'};
  const {dispatch,tradeRedList} = props;
  console.log('---打印客户持仓详情数据---',props);
  return (
    <div>
      <Title {...titleProps}/>
      <div style={{paddingTop: '1.72rem'}}>
        <TradePositionTabs tradeRedList={tradeRedList} dispatch={dispatch}/>
      </div>
    </div>
  )
}

// export default TradePositionDetail;

function connectProdunctFunc({tradeRedList})
{
  return { tradeRedList }
}
export default connect(connectProdunctFunc)(TradePositionDetail);
