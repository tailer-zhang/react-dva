import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Title from '../../components/product/Title';
import ProBanner from '../../components/product/ProductBanner';
import InfoTab from '../../components/product/InfoTab';
import OrderBtn from '../../components/product/OrderBtn';
import DataTab from '../../components/product/ProdDataTab';


import proDetailStyles from '../../styles/product/ProductDetail.less';
import prodQrnhStyles from '../../styles/product/ProductQrnh.less';

const ProductQrnh = ({dispatch,xtProduct,location}) => {
	const TitleProps = {title:'产品详情', backMethord:()=>dispatch(routerRedux.push('/productMain'))};
	let { productDetail, fileList, typeList, navList ,typeDetail,touchItem } = xtProduct;
	return (
		<div className={proDetailStyles.mainContent}>
			<Title {...TitleProps}/>
			<div className={proDetailStyles.bannerArea}>
				<ProBanner mode={'wage'} dispatch={dispatch} selectShrType={typeDetail} bannerData={location.state} selShrType={typeList} touchItem={touchItem}/>
			</div>
			<div>
				<DataTab navData={navList}/>
			</div>
			<div>
				<InfoTab className={proDetailStyles.margin21} productDetail={productDetail} fileList={fileList} typeList={typeList} defaultActiveKey={xtProduct.defaultActiveKey} />
			</div>
			<OrderBtn />
		</div>
	);
};

function connectProductFunc({xtProduct})
{
	  return {xtProduct};
}

export default connect(connectProductFunc)(ProductQrnh);
