import React, { PropTypes } from 'react';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const ToBackImg = ({title}) => {
	const toBack = () => {
		history.back();
	};
	return (
		<div className={proDetailStyles.toBackBtn} onClick={toBack}>
			<img src={require("../../image/icon/back_01.png")} className={proDetailStyles.m_back_arrow}/>
		</div>
	);
};
export default ToBackImg;
