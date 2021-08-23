import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Title from '../../components/product/Title';
import OrderBtn from '../../components/product/OrderBtn';
import SelectMonth from '../../components/product/SelectMonth';

import proDetailStyles from '../../styles/product/ProductDetail.less';
import proMarketStyles from '../../styles/product/MarketMonth.less';

const MarketMonth = (props)=> {
	let viewProps = props;
	if(props.mode=='subView')
	{
		viewProps = props;
	}
	else {
		viewProps = props.location.state
	}


	let {title,dataSource,selectValue,onChange,valueChanged,backMethord}	=	viewProps;
	// console.log('=====dom外部====',viewProps,onChange,props.location);
	const TitleProps = {title:title,backMethord:backMethord};


	return (
		<div className={proMarketStyles.container}>
			<Title {...TitleProps} />
			<SelectMonth dataSource={dataSource} selectValue={selectValue}
		 	onChange={onChange} valueChanged={valueChanged} />
		</div>
		)
}


export default MarketMonth;
