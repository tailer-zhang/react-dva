import React, { PropTypes } from 'react';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { SegmentedControl, WingBlank } from 'antd-mobile';

const EquityTrend2 = ({title}) => {
	return (
		<div className={proDetailStyles.trendWrap}>
			<div className={proDetailStyles.timeTab}>
				<WingBlank size="lg" className="sc-example">
			        <SegmentedControl
			          values={['3个月', '6个月', '一年', '今年']}
			          tintColor={'#ff0000'}
			          style={{ height: '0.773333rem', width: '9.226667rem' }}
			        />
			    </WingBlank>
			</div>
			<div className={proDetailStyles.imgWrap}>
				<img src={require("../../image/trendPic.jpg")}/>
			</div>
		</div>
	);
};
export default EquityTrend2;
