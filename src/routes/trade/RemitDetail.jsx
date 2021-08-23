//废弃 汇款信息详情页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Title from '../../components/product/Title';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const RemitDetail = () => {
  const TitleProps = {
    title:'汇款信息详情'
  };
  return(
    <div className={PerCusDetailStyles.mainContent}>
      <Title {...TitleProps} />
      <div className={tradeStyles.controlMenu}>
        <p className={tradeStyles.WhiteSpace}></p>
        <div className={tradeStyles.tabInput}>
          <div className={PerCusDetailStyles.infoWrap}>
      			<ul>
      				<li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>资金流水号</p>
      					<p className={proDetailStyles.infoCon}>m0tr993</p>
      				</li>
      				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
      					<p className={proDetailStyles.infoTitle}>交易单号</p>
      					<p className={proDetailStyles.infoCon}>SG3950850204</p>
      				</li>
      			</ul>
      		</div>
          <div className={PerCusDetailStyles.infoWrap}>
      			<ul>
      				<li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>客户银行账号</p>
      					<p className={proDetailStyles.infoCon}>浦发银行 | 6112980922348799</p>
      				</li>
              <li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>收款银行账号</p>
      					<p className={proDetailStyles.infoCon}>6112980922348799</p>
      				</li>
              <li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>转账金额(人民币)</p>
      					<p className={proDetailStyles.infoCon}>3000000.00</p>
      				</li>
              <li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>转账金额大写</p>
      					<p className={proDetailStyles.infoCon}>壹仟万</p>
      				</li>
      				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
      					<p className={proDetailStyles.infoTitle}>打款日期</p>
      					<p className={proDetailStyles.infoCon}>2017-01-06</p>
      				</li>
      			</ul>
      		</div>
          <div className={PerCusDetailStyles.infoWrap}>
      			<ul>
      				<li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>核对状态</p>
      					<p className={proDetailStyles.infoCon}>成功</p>
      				</li>
      				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
      					<p className={proDetailStyles.infoTitle}>核对说明</p>
      					<p className={proDetailStyles.infoCon}>完成多有资料的核对和审批流程，一切顺利</p>
      				</li>
      			</ul>
      		</div>
          <div className={PerCusDetailStyles.infoWrap}>
      			<ul>
      				<li className={proDetailStyles.infoItem}>
      					<p className={proDetailStyles.infoTitle}>所属分公司</p>
      					<p className={proDetailStyles.infoCon}>广州分公司</p>
      				</li>
      				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
      					<p className={proDetailStyles.infoTitle}>理财师</p>
      					<p className={proDetailStyles.infoCon}>罗振雄</p>
      				</li>
      			</ul>
      		</div>
          <p style={{height:'145px',backgroundColor:'#efeff4'}}></p>
        </div>
      </div>
    </div>
  );
};
export default RemitDetail;
