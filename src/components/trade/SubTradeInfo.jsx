//废弃组件
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件

const SubTradeInfo = () => {
  return(
    <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom:'120px'}}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>交易单号</p>
  					<p className={proDetailStyles.infoCon}>SDE90284028403840284</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>合同编号</p>
  					<p className={proDetailStyles.infoCon}>E90284028403840284</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>产品名称</p>
  					<p className={proDetailStyles.infoCon}>五牛尊福</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>产品类别</p>
  					<p className={proDetailStyles.infoCon}>A类</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>客户名称</p>
  					<p className={proDetailStyles.infoCon}>奥丽兰</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>证件类型</p>
  					<p className={proDetailStyles.infoCon}>营业执照</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>证件号码</p>
  					<p className={proDetailStyles.infoCon}>ER98392942048203</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>交易类型</p>
  					<p className={proDetailStyles.infoCon}>认购</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>申请日期</p>
  					<p className={proDetailStyles.infoCon}>2017-01-01</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>预约金额(人民币)</p>
  					<p className={proDetailStyles.infoCon}>1,000,000.00壹佰万</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>预约到期日</p>
  					<p className={proDetailStyles.infoCon}>2017-01-01</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>交易金额(人民币)</p>
  					<p className={proDetailStyles.infoCon}>1,000,000.00壹佰万</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>手续费</p>
  					<p className={proDetailStyles.infoCon}></p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>是否发起撤单</p>
  					<p className={proDetailStyles.infoCon}>未发起</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>申请状态</p>
  					<p className={proDetailStyles.infoCon}>确认成功(手工确认成功)</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>确认份额(份)</p>
  					<p className={proDetailStyles.infoCon}>1,000,000.00</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>净值</p>
  					<p className={proDetailStyles.infoCon}>1.2323</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>确认日期</p>
  					<p className={proDetailStyles.infoCon}>2017-01-06</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>理财师</p>
  					<p className={proDetailStyles.infoCon}>卢晓琳</p>
  				</li>
  			</ul>
  		</div>
      <h3 style={{color:'#848484',fontsize:'26px',paddingLeft:'30px',paddingTop:'18px'}}>经办人信息</h3>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>姓名</p>
  					<p className={proDetailStyles.infoCon}>冬天</p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>证件类型</p>
  					<p className={proDetailStyles.infoCon}>护照</p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>证件号码</p>
  					<p className={proDetailStyles.infoCon}>4567382937937300</p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};
export default SubTradeInfo;
