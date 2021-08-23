import React, {PropTypes} from 'react';
import {connect} from 'dva';
import Title from '../../components/product/Title';
import SafeTabs from '../../components/product/SafeTabs';
const SafeGuard = ({bxProduct,dispatch}) => {
	let {productDetail} = bxProduct;
	const TitleProps = {title:productDetail.prodName};
	return (
			<div style={{}}>
				<header style={{borderBottom: 'solid 1px #ddd'}}></header>
				<section><SafeTabs productDetail={productDetail} /></section>
			</div>
		)
}

// <Title {...TitleProps}/>


function connectProductFunc({ bxProduct }){
  return { bxProduct };
}

export default connect(connectProductFunc)(SafeGuard);
