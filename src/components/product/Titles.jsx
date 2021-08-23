import React, { PropTypes } from 'react';

import proDetailStyles from '../../styles/product/ProductDetail.less';

const Titles = (props) => {
let {title} = props;
	return (
		<div className={proDetailStyles.titleWrap}>
			<h3 className={proDetailStyles.title1}>{title}</h3>
			{props.children}
		</div>
	);
};
export default Titles;
