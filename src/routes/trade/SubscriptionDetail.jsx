//废弃   认购信息详情页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Title from '../../components/product/Title';
// import RedeemArea from '../../components/trade/RedeemArea';
import SubTradeInfo from '../../components/trade/SubTradeInfo';//交易信息
import SubRemitInfo from '../../components/trade/SubRemitInfo';//汇款信息
import SubDataInfo from '../../components/trade/SubDataInfo';//资料查看

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
const TabPane = Tabs.TabPane;
const SubscriptionDetail = () => {
  const TitleProps = {
    title:'认购信息详情'
  };
  return (
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps} />
      <div className={tradeStyles.controlMenu}>
        <p className={tradeStyles.WhiteSpace}></p>
        <div className={tradeStyles.tabInput}>
          <Tabs defaultActiveKey="2" swipeable={false} animated={false}>
            <TabPane tab="交易信息" key="1">
              <div  className={PerCusDetailStyles.tabCon}>
                <SubTradeInfo />
              </div>
            </TabPane>
            <TabPane tab="汇款信息" key="2">
              <div  className={PerCusDetailStyles.tabCon}>
                <SubRemitInfo />
              </div>
            </TabPane>
            <TabPane tab="资料查看" key="3">
              <div  className={PerCusDetailStyles.tabCon}>
                <SubDataInfo />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionDetail;
