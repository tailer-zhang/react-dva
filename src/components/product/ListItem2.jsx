import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import CircleProgress from './CircleProgress';
import productStyle from '../../styles/product/ProductStyle.less';
let scale = window.dpr/2.0;
const ListItem2 = ({data}) => {
	return (
		<div className={productStyle.itemWrap2}>
			<div className={productStyle.itemMainInfo}>
				<h2 className={productStyle.proTitle1} style={{marginBottom:'0.4rem'}}>{data.prodName&&data.prodName.length>=17?data.prodName.substring(0,17):data.prodName}</h2>
				<div className={productStyle.trendDet  + " " + productStyle.trendDetSpan}>
					<p>
						<span className={productStyle.txt2}>{data.maxAmt!=undefined?parseInt(data.maxAmt)/10000:'0.00'}<i style={{fontSize:'0.346rem',paddingTop:'0.1rem'}}>万</i></span><br/>
						<span className={productStyle.margin0}>可用金额(元)</span>
					</p>
					<p>
						<span className={productStyle.txt3}>{data.maxSaleNum}</span><br/>
						<span className={productStyle.margin0}>可用合同(份)</span>
					</p>
				</div>
			</div>
		</div>
	);
};
export default ListItem2;
