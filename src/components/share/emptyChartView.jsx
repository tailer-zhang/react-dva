import React, { PropTypes ,Component } from 'react';
import proDetailStyles from '../../styles/product/ProductDetail.less';


export default class EmptyChartView extends Component {
	constructor(props) {
		 super(props);

	}


	render(){

		return(
			<div className={proDetailStyles.emptyBody}>
				<img src={require("../../image/product/empoty_01.png")}/>
                <p>净值待维护！</p>
			</div>
		);
	}
}
