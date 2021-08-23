import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Dic from '../../utils/dictionary';
import { Link } from 'dva/router';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
//样式文件
const PersonalCareerInfo = ({dispatch,perCustInfo}) => {
  const data = perCustInfo.perInfoList;
  return (
    <div className={PerCusDetailStyles.basicInfoWrap}>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>职位</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('vocation',data.vocation)
              }
            </p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>职位描述</p>
  					<p className={proDetailStyles.infoCon}>{data.vocationDesc}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>行业性质</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('profession',data.profession)
              }
            </p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>行业性质描述</p>
  					<p className={proDetailStyles.infoCon}>{data.professionDesc}</p>
  				</li>
  			</ul>
  		</div>
      <div className={PerCusDetailStyles.infoWrap}>
  			<ul>
  				<li className={proDetailStyles.infoItem}>
  					<p className={proDetailStyles.infoTitle}>公司类型</p>
  					<p className={proDetailStyles.infoCon}>
              {
                Dic.fetchDicValue('companyType',data.companyType)
              }
            </p>
  				</li>
  				<li className={proDetailStyles.infoItem} style={{borderBottom:'0px'}}>
  					<p className={proDetailStyles.infoTitle}>公司类型描述</p>
  					<p className={proDetailStyles.infoCon}>{data.companyDesc}</p>
  				</li>
  			</ul>
  		</div>
    </div>
  );
};
export default PersonalCareerInfo;
