//废弃 赎回信息详情页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Title from '../../components/product/Title';
import RedeemArea from '../../components/trade/RedeemArea';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
const TabPane = Tabs.TabPane;
const RedeemDetail = () => {
  const TitleProps = {
    title:'赎回信息详情'
  };
  return (
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps} />
      <div className={tradeStyles.controlMenu}>
        <p className={tradeStyles.WhiteSpace}></p>
        <div className={tradeStyles.tabInput}>
          <Tabs defaultActiveKey="2" swipeable={false} animated={false}>
            <TabPane tab="赎回信息" key="1">
              <div  className={PerCusDetailStyles.tabCon}>
                <RedeemArea />
              </div>
            </TabPane>
            <TabPane tab="交易附件" key="2">
              <div  className={PerCusDetailStyles.tabCon}>
                <div className={tradeStyles.redeemImgArea}>
                  <div className={tradeStyles.redeemDataTitle}>
                    <h3>赎回申请单</h3>
                    <p><span>0</span>/5</p>
                  </div>
                  <div className={tradeStyles.redeemImgs}>
                    <img src={require("../../image/trade/defaultImg.png")}/>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default RedeemDetail;
