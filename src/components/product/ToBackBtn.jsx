import React, { PropTypes } from 'react';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const ToBackBtn = ({title,toBack}) => {
	if(toBack==undefined)
	{
		toBack = (e) => {
			history.back();
		};
	}
	return (
		<div className={proDetailStyles.toBackBtn} onClick={toBack}>
			<img src={require("../../image/icon/back_01.png")} className={proDetailStyles.m_back_arrow}/>
			<span>返回</span>
		</div>
	);
};
export default ToBackBtn;
