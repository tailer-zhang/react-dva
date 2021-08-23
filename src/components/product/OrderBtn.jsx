import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import {routerRedux } from 'dva/router';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { List,Toast} from 'antd-mobile';


const OrderBtn = ({topData,dispatch,location}) => {
	function toAppoint(data,location){
		if(!data||!data.productDetail||!data.productDetail.custLvl)
		{
			Toast.fail('产品获取错误，无法进行产品预约!',1);
			return;
		}
		console.log('data32323',data)
		dispatch(routerRedux.push({pathname:'/appoint',state:{data:data,location:location}}));
	}
	return (
		<div className={proDetailStyles.orderBtn} onClick={()=>toAppoint(topData,location)}>
			<img src={require("../../image/icon/clock.png")} className={proDetailStyles.order_icon}/>
			<span>立即预约</span>
		</div>
	);
};
export default OrderBtn;
