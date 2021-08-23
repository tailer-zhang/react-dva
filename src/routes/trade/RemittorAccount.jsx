//废弃 汇款人账户页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link ,routerRedux} from 'dva/router';
import Title from '../../components/product/Title';
import { List, Radio, Flex } from 'antd-mobile';

import proDetailStyles from '../../styles/product/ProductDetail.less';
import proMarketStyles from '../../styles/product/MarketMonth.less';
import tradeStyles from '../../styles/trade/trade.less';

const RadioItem = Radio.RadioItem;
const SelectAccount = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },
  onChange(value) {
    this.setState({
      value,
    });
  },
  render() {
    const { value } = this.state;
    const JumpDetail = () => {
   		const timeData = [{
   			value: 'ProductDetail'
   		}];
   	// 	 browserHistory.push(`/${timeData[0].value}`);
   	};
    const data = [
      { value: 0, label: '工商银行 | 6333999999999999' },
      { value: 1, label: '民生银行 | 6333999999999999' },
    ];
    return (<div>
      <List>
        {data.map(i => (
          <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
           {i.label}
          </RadioItem>
        ))}
      </List>
    </div>);
  },
});

const RemittorAccount = (props)=> {
  let { dispatch } = props;
	const TitleProps = {title:'汇款人账户'};
	return (
		<div className={proMarketStyles.container}>
			<Title {...TitleProps} />
			<p className={proMarketStyles.fullP}></p>
			<SelectAccount />
      <p className={tradeStyles.remitAddBtn} onClick={ ()=>dispatch(routerRedux.push({pathname:'/RemitAccountAdd'}))}>添加汇款账户</p>
		</div>
		)
}


export default connect()(RemittorAccount);
