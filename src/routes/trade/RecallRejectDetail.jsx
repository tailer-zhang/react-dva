//废弃 撤单驳回详情页面-王攀
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
const RecallRejectDetail = () => {
  const TitleProps = {
    title:'撤单驳回详情'
  };
  return (
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps} />
      <div className={tradeStyles.controlMenu}>
        <p className={tradeStyles.WhiteSpace}></p>
        <div className={tradeStyles.tabInput}>
          <Tabs defaultActiveKey="2" swipeable={false} animated={false}>
            <TabPane tab="撤单信息" key="1">
              <div  className={PerCusDetailStyles.tabCon}>
                <div style={{width:'100%'}}>
                  <div className={PerCusDetailStyles.infoWrap}>
              			<ul>
              				<li className={proDetailStyles.infoItem}>
              					<p className={proDetailStyles.infoTitle}>交易单号</p>
              					<p className={proDetailStyles.infoCon}>CD20170103888893023[撤单]</p>
              				</li>
              				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
              					<p className={proDetailStyles.infoTitle}>原交易单号</p>
              					<p className={proDetailStyles.infoCon} style={{color:'#f22f33',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>E984794737849[赎回]
                          <img src={require("../../image/icon/arrowR.png")} style={{width:'16px',height:'26px',marginLeft:'20px'}}/>
                        </p>
              				</li>
              			</ul>
              		</div>
                  <div className={PerCusDetailStyles.infoWrap}>
              			<ul>
              				<li className={proDetailStyles.infoItem}>
              					<p className={proDetailStyles.infoTitle}>撤单人</p>
              					<p className={proDetailStyles.infoCon}>卢晓琳</p>
              				</li>
                      <li className={proDetailStyles.infoItem}>
              					<p className={proDetailStyles.infoTitle}>撤单时间</p>
              					<p className={proDetailStyles.infoCon}>2017-01-03 15:22:55</p>
              				</li>
              				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
              					<p className={proDetailStyles.infoTitle} style={{display:'flex',alignItems:'center'}}>撤单原因</p>
              					<p className={proDetailStyles.infoCon}>测试阶段测试阶段测试阶段测试阶段测试阶段测试阶段测试阶段测试阶段测试阶段测试阶段</p>
              				</li>
              			</ul>
              		</div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="撤单资料" key="2">
              <div  className={PerCusDetailStyles.tabCon}>
                <div className={tradeStyles.redeemImgArea}>
                  <div className={tradeStyles.redeemDataTitle}>
                    <h3>撤单附件</h3>
                    <p><span>1</span>张</p>
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
export default RecallRejectDetail;
