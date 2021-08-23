import React from 'react';
import { browserHistory } from 'dva/router';
import { Tabs, WhiteSpace,List,Card } from 'antd-mobile';
import styles from '../../styles/trade/tradePositionTabs.less';
import TradeCard from '../share/TradeInfoCard';
import FreezeCard from '../share/FreezeCard';
import PositionInfo from '../share/PositionInfo';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const data = [
  {
    title: '认购确认',
    apply: '500.00',
    affirm: '5,000,000.00',
    word: '申请金额(人民币)'
  },
  {
    title: '转让确认',
    apply: '1,000,000.00',
    affirm: '0',
    word: '申请份额(份)'
  }
];
const data1 = [
  {
    title: '转让申请',
    apply: '1,000,000.00',
    word: '冻结份额(份)'
  }
];
const pageSwitch = () => {
  browserHistory.push('tradeAffirmPortion')
};
const TradePositionTabs = ({tradeRedList,dispatch}) => {
  let postInfo = tradeRedList.model;
  let postModel = postInfo.custShrModel;
  if(postModel==undefined)postModel={};
  return (
    <div>
      <Tabs defaultActiveKey="1" swipeable={false}>
        <TabPane tab="持仓信息" key="1">
          <PositionInfo postModel={postModel}/>
        </TabPane>
        <TabPane tab="交易确认份额" key="2">
          <TradeCard dataSource={postInfo.confShrList}/>
        </TabPane>
        <TabPane tab="交易冻结份额" key="3">
          <FreezeCard dataSource={postInfo.tradShrList}/>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TradePositionTabs;
