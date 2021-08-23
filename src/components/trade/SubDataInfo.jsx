import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import tradeStyles from '../../styles/trade/trade.less';

const SubDataInfo = () => {
  return(
    <div className={tradeStyles.remitWrap} style={{height:'auto',paddingBottom:'200px'}}>
      <div className={tradeStyles.redeemImgArea}>
        <div className={tradeStyles.redeemDataTitle}>
          <h3>证件资料</h3>
          <p><span>0</span>/5</p>
        </div>
        <div className={tradeStyles.redeemImgs}>
          <img src={require("../../image/trade/defaultImg.png")}/>
        </div>
      </div>
      <div className={tradeStyles.redeemImgArea}>
        <div className={tradeStyles.redeemDataTitle}>
          <h3>汇款资料</h3>
          <p><span>0</span>/10</p>
        </div>
        <div className={tradeStyles.redeemImgs}>
          <img src={require("../../image/trade/defaultImg.png")}/>
        </div>
      </div>
      <div className={tradeStyles.redeemImgArea}>
        <div className={tradeStyles.redeemDataTitle}>
          <h3>交易资料</h3>
          <p><span>0</span>/5</p>
        </div>
        <div className={tradeStyles.redeemImgs}>
          <img src={require("../../image/trade/defaultImg.png")}/>
        </div>
      </div>
      <div className={tradeStyles.redeemImgArea}>
        <div className={tradeStyles.redeemDataTitle}>
          <h3>银行卡资料</h3>
          <p><span>0</span>/5</p>
        </div>
        <div className={tradeStyles.redeemImgs}>
          <img src={require("../../image/trade/defaultImg.png")}/>
        </div>
      </div>
      <div className={tradeStyles.redeemImgArea}>
        <div className={tradeStyles.redeemDataTitle}>
          <h3>经办人资料</h3>
          <p><span>0</span>/10</p>
        </div>
        <div className={tradeStyles.redeemImgs}>
          <img src={require("../../image/trade/defaultImg.png")}/>
        </div>
      </div>
    </div>
  );
};
export default SubDataInfo;
