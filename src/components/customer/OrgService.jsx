import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Dic from '../../utils/dictionary';


//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件
const OrgService = ({data}) => {
  return (
    <div className={PerCusDetailStyles.basicInfoWrap}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>会员认证方式</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('mbrCertifyType',data.mbrCertifyType)
              }
            </p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>合同认证方式</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('ctCertifyType',data.ctCertifyType)
              }
            </p>
  				</li>
          <li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>资料接收</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('importantReceive',data.importantReceive)
              }
            </p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};
export default OrgService;
