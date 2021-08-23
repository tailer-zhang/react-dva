import React, { PropTypes ,Component } from 'react';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { SegmentedControl, WingBlank } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import ChartView  from './ChartView';
import MonetaryChart  from './MonetaryChart';

export default class EquityTrend extends Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 numberType0:'0'
		 };
	}

	renderList(key,selectValue) {
		let dic = Dic.fetchDicList(key);
		return (
			<ul className={proDetailStyles.timeTab1}>
				{
					Object.keys(dic).map((item,index) => {
							let value = dic[item];
							let className = '';
							if(selectValue === item) {
								className = proDetailStyles.curTime;
							}
							return (
								<li onClick={this.clickLi.bind(this,item,key)}
								className={className} key={index}>{ value }</li>
							)
						}
					)
				}
			</ul>
		)
	}

	clickLi(item,key,index) {
		const {dispatch} = this.props;
		const item1 = Number(item)+1;
		if(key==='timeSlot') {
			this.setState({
					numberType0 : item
				});
		};
		dispatch({type:'xtProduct/fetchNetWorthList',payload:item1});
	}

	render(){
		const {numberType0} = this.state;
		const {monetaryStatue,dispatch,processNavList} = this.props;
		let chart = <ChartView data={processNavList} />;
		if(monetaryStatue === '1'){               //现金管理 非净值
			chart =<MonetaryChart data={processNavList} />;
		}
		return(
			<div className={proDetailStyles.trendWrap}>
				<h3 className={proDetailStyles.title2}>净值走势</h3>
				<p className={proDetailStyles.line1}></p>
				<div className={proDetailStyles.lineChart}>
				 { this.renderList('timeSlot',numberType0) }
				</div>
				<div className={proDetailStyles.imgWrap}>
					{chart}
				</div>
			</div>
		);
	}
	componentDidMount() {
		let {dispatch} = this.props;
		dispatch({type:'xtProduct/fetchNetWorthList',payload:1});
	}
}
