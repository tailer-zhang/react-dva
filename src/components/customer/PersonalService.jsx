import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Dic from '../../utils/dictionary';


//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件
const PersonalService = ({dispatch,perCustInfo}) => {
  const data = perCustInfo.perInfoList;
  let fundsStr = ''
  data.sourceOfFunds.indexOf(',') !== -1 ? data.sourceOfFunds.split(',').map((item)=>{
    fundsStr = fundsStr + Dic.fetchDicValue('sourceOfFunds',item) + ' '
  }) : fundsStr =  Dic.fetchDicValue('sourceOfFunds',data.sourceOfFunds)
  
  return (
    <div className={PerCusDetailStyles.basicInfoWrap}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>会员认证方式</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('mbrCertifyType',data.mbrCertifyType)}
            </p>
  				</li>
          {
            data.ctCertifyType != undefined?<li className={proDetailStyles.infoItem}>
    					<p className={proDetailStyles.infoTitle}>合同认证方式</p>
    					<p className={proDetailStyles.infoCon}>
                {Dic.fetchDicValue('ctCertifyType',data.ctCertifyType)}
              </p>
    				</li>:''
          }
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>资料接收</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('importantReceive',data.importantReceive)}
            </p>
  				</li>
          {/*
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>风险偏好</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('riskLevel',data.riskLevel)}
            </p>
  				</li>
          */}
  			</ul>
  		</div>
      <h3 className={PerCusDetailStyles.txt_06}>投资信息</h3>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>资金来源</p>
  					<p className={proDetailStyles.infoCon}>
              {fundsStr}
            </p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>可投资产</p>
  					<p className={proDetailStyles.infoCon}>
              {Dic.fetchDicValue('canInvestAsset',data.canInvestAsset)}
            </p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};
export default PersonalService;
