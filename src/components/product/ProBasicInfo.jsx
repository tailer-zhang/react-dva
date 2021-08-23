import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import Dic from '../../utils/dictionary';
import {html_decode} from '../../utils/formatUtils';
import ReactHtmlParser from 'react-html-parser';


const ProBasicInfo = ({title,basicInfoData}) => {
	return (
		<div className={proDetailStyles.infoWrap}>
			<ul>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>产品名称</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.prodName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>产品简称</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.prodAlia}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>备案编码</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.prodCode}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>管理人</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.mgrName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>一级分类</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.earnTypeName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>二级分类</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.prodTypeName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>运作方式</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.operTypeName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>风险等级</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.prodRiskLevelName}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>总额度(万)</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.totAmt}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>合同数(份)</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.totCont}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>募集起始日</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.raisBegDate}</p>
				</li>
				<li className={proDetailStyles.infoItem}>
					<p className={proDetailStyles.infoTitle}>募集结束日</p>
					<p className={proDetailStyles.infoCon}>{basicInfoData.raisEndDate}</p>
				</li>
				<li className={proDetailStyles.proCen}>
					<p className={proDetailStyles.infoTitle}>产品描述</p>
					<div className={proDetailStyles.infoCon}>{ReactHtmlParser(html_decode(basicInfoData.prodDesc!=undefined?basicInfoData.prodDesc:''))}</div>
				</li>
			</ul>
		</div>
	);
};
export default ProBasicInfo;
