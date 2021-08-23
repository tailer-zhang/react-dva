import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件

const RedeemArea = () => {
  return(
    <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom:'120px'}}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>申请单编号</p>
  					<p className={proDetailStyles.infoCon}>SDE90284028403840284</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>原申请单编号</p>
  					<p className={proDetailStyles.infoCon}>E90284028403840284</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>客户名称</p>
  					<p className={proDetailStyles.infoCon}>王晓静</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>客户类型</p>
  					<p className={proDetailStyles.infoCon}>钻石客户</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>客户证件类型</p>
  					<p className={proDetailStyles.infoCon}>护照</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>证件号码</p>
  					<p className={proDetailStyles.infoCon}>4567382937937300</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>产品名称</p>
  					<p className={proDetailStyles.infoCon}>国信测试产品-3号</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>产品类别</p>
  					<p className={proDetailStyles.infoCon}>B</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>赎回份额</p>
  					<p className={proDetailStyles.infoCon}>888888000.00</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>可用份额</p>
  					<p className={proDetailStyles.infoCon}>0.00</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>赎回至</p>
  					<p className={proDetailStyles.infoCon}>民生银行 | 20161223093084933</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>赎回日期</p>
  					<p className={proDetailStyles.infoCon}>2017-02-23</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>赎回原因</p>
  					<p className={proDetailStyles.infoCon}>测试阶段</p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};
export default RedeemArea;
