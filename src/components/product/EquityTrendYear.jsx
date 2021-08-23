import React, { PropTypes ,Component } from 'react';
import ToBackBtn from './ToBackBtn';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import ChartView  from './ChartView';

const TabPane = Tabs.TabPane;

/**
 * 年华收益率
 */
export default class EquityTrendYear extends Component {
	constructor(props) {
		 super(props);
		 this.state = {
			 numberType0:'0',
			 currentTabKey: 1,
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
	handleTabClick(key) {
		this.setState({
			currentTabKey: key
		})
	}

	render(){
		const {numberType0,currentTabKey} = this.state;
		const {monetaryStatue,dispatch,processNavList,prodType,yearProcessNav} = this.props;
		let chart = <ChartView data={processNavList} />;
		let yearChart = <ChartView type={'annualRate'} data={yearProcessNav} />; //年化收益率
		return(
			<div className={proDetailStyles.trendWrap}>
				<Tabs onTabClick={this.handleTabClick.bind(this)} swipeable={false} animated={true} defaultActiveKey="1">
					<TabPane tab="净值走势" key="1">
						<p className={proDetailStyles.line1}></p>
						<div className={proDetailStyles.lineChart}>
							{ this.renderList('timeSlot',numberType0) }
						</div>
						<div className={proDetailStyles.imgWrap}>
							{currentTabKey==1&&chart}
						</div>
					</TabPane>
					<TabPane tab={prodType=='51'?'7日年化收益率':'91日年化收益率'} key="2">
						<div className={proDetailStyles.lineChart}>
							{ this.renderList('timeSlot',numberType0) }
						</div>
						<div className={proDetailStyles.imgWrap}>
							{currentTabKey==2&&yearChart}
						</div>
						<p className={proDetailStyles.yeartips}>本基金过往业绩并不代表本基金的未来表现，本基金不承诺最低收益，也不承诺本金安全</p>
					</TabPane>
				</Tabs>
			</div>
		);
	}
	componentDidMount() {
		let {dispatch} = this.props;
		dispatch({type:'xtProduct/fetchNetWorthList',payload:1});
	}
}
