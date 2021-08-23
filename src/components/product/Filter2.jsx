import React, {
	PropTypes,
	Component
} from 'react';
import ToBackBtn from './ToBackBtn';
import productStyle from '../../styles/product/ProductStyle.less';
import Dic from '../../utils/dictionary';
import {
	SearchBar
} from 'antd-mobile';


export default class Filter extends Component {
	constructor(props) {
		super(props);

		let {
			filterArgs
		} = props;
		this.state = {
			rate: '',
			...this.transformFilterToState(filterArgs)
		};
	}

	transformFilterToState(filterArgs) {
		let hotSearchValValue = {
			hotSearchVal: []
		};
		if (!filterArgs)
			return hotSearchValValue;
		if (filterArgs.hotSearchVal) {
			hotSearchValValue.hotSearchVal = filterArgs.hotSearchVal.split(',');
		}

		return {
			...filterArgs,
			...hotSearchValValue
		};
	}

	// 这里触发了父组件的请求函数 这里可能不太对的样子
	transformStateToFilter(state) {
		let hotSearchValArr = state.hotSearchVal;
		let dic = state
		// 这就是参数
		return {
			...dic,
			hotSearchVal: hotSearchValArr.join(',')
		};
	}

	renderListMethord(key, selectValue, justifyMethord) {
		let dic = Dic.fetchDicList(key);
		if (!justifyMethord) {
			justifyMethord = (value, item) => {
				return value === item;
			};
		}
		return ( <
			ul > {
				Object.keys(dic).map((item, index) => {
					let desc = dic[item];
					let classname = '';
					if (justifyMethord(selectValue, item))
						classname = productStyle.curFilter;

					return ( <
						li className = {
							classname
						}
						onClick = {
							this.clickFilterEvent.bind(this, key, item, desc)
						}
						key = {
							index
						} > {
							desc
						} <
						/li>
					);
				})
			} <
			/ul>
		);
	}

	clickFilterEvent(key, item, desc) {
		if (key == 'isSaleFlag') {
			this.setState({
				isSaleFlag: item == this.state.isSaleFlag ? undefined : item
			});
		} else if (key == 'deadline') {
			this.setState({
				deadline: item == this.state.deadline ? undefined : item
			});
		} else if (key === 'onlineSign') {
			this.setState({
				onlineSign: item == this.state.onlineSign ? undefined : item
			});
		} else if (key == 'hotSearchVal') { //热门搜索，热门搜索可以进行多选
			let {
				hotSearchVal
			} = this.state;
			//表示已经包含这个热门筛选条件
			if (this.isContainHotSearch(hotSearchVal, item)) {
				hotSearchVal.splice(hotSearchVal.indexOf(item), 1);
			} else hotSearchVal.push(item);

			this.setState({
				hotSearchVal: hotSearchVal
			});
		} else if (key == 'prodClass') {
			this.setState({
				earnType: item == this.state.earnType ? undefined : item,
			});
			switch (item) {
				// console.log(item,this.state.secondClass)
				case '1':
					this.setState({
						keyClass: 'secondClassFir',
						prodType: undefined
					})
					break;
				case '2':
					this.setState({
						keyClass: 'secondClassSec',
						prodType: undefined
					})
					break;
				case '3':
					this.setState({
						keyClass: 'secondClass3',
						prodType: undefined
					})
					break;
				case '4':
					this.setState({
						keyClass: 'secondClass4',
						prodType: undefined
					})
					break;
				case '5':
					this.setState({
						keyClass: 'secondClassThr',
						prodType: undefined
					})
					break;
			}
		} else if (key == this.state.keyClass) {
			this.setState({
				prodType: item == this.state.prodType ? undefined : item,
			});
		}
	}

	isContainHotSearch(value, item) {
		return value.indexOf(item) >= 0;
	}

	search = (value) => {
		console.log(value)
		this.setState({
			rate: value
		})
	}



	render() {
		const {
			backEvent,
			filterArgs,
			filterEvent
		} = this.props;
		let {
			earnType,
			prodType,
			isSaleFlag,
			hotSearchVal,
			deadline,
			keyClass,
			onlineSign
		} = this.state;
		return ( <
			div className = {
				productStyle.filterWrap
			} >
			<
			div className = {
				productStyle.mask
			}
			onClick = {
				backEvent
			} > < /div> <
			div style = {
				{
					height: '100%',
					width: '8.88rem'
				}
			} >
			<
			div className = {
				productStyle.FilterCon
			}
			style = {
				{
					height: document.body.clientHeight
				}
			} >
			<
			p className = {
				productStyle.marginTopP
			} > < /p> <
			div className = {
				productStyle.filterMenu
			} >
			<
			p className = {
				productStyle.filterTitle
			} > 一级分类 < /p> <
			div > {
				this.renderListMethord('prodClass', earnType)
			} <
			/div> <
			/div> <
			p className = {
				productStyle.marginTopP
			} > < /p> {
				keyClass == undefined || earnType == undefined ? < div / > : < div className = {
						productStyle.filterMenu
					} >
					<
					p className = {
						productStyle.filterTitle
					} > 二级分类 < /p> <
					div > {
						this.renderListMethord(keyClass, prodType)
					} <
					/div> <
					/div>
			} <
			p className = {
				productStyle.marginTopP
			} > < /p> <
			div className = {
				productStyle.filterMenu
			} >
			<
			p className = {
				productStyle.filterTitle
			} > 产品期限 < /p> <
			div > {
				this.renderListMethord('deadline', deadline)
			} <
			/div> <
			/div> <
			p className = {
				productStyle.marginTopP
			} > < /p> <
			div className = {
				productStyle.filterMenu
			} >
			<
			p className = {
				productStyle.filterTitle
			} > 支持线上签署 < /p> <
			div > {
				this.renderListMethord('onlineSign', onlineSign)
			} <
			/div> <
			/div> <
			div > < p style = {
				{
					height: '2.3rem'
				}
			} > < /p></div >
			<
			/div> <
			div className = {
				productStyle.ctrBtns
			} >
			<
			p className = {
				productStyle.ctrBtn
			}
			onClick = {
				() => {
					this.setState({
						earnType: undefined,
						prodType: undefined,
						isSaleFlag: undefined,
						deadline: undefined,
						onlineSign: undefined,
						hotSearchVal: []
					});
					filterEvent({}, 'reset');
				}
			} > 重置 < /p> <
			p className = {
				productStyle.okBtn
			}
			onClick = {
				() => {
					filterEvent(this.transformStateToFilter(this.state));
				}
			} > 确定 < /p> <
			/div> <
			/div> <
			/div>
		);
	}
}
// line 182 to 192
// <p className={productStyle.marginTopP}></p>
// <div className={productStyle.filterMenu}>
//   <p className={productStyle.filterTitle}>预期收益率</p>
//   <div className="filterPage2Box">
//   <SearchBar  onChange={(value) => this.search(value)} onClear={this.clear} /> 			           
//   </div>
// </div>