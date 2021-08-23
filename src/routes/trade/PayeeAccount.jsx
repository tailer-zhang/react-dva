//收款人账户页面-王攀
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router';
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
  onChange(item,e) {
    // e.preventDefault();
    console.log('=====')
    let {tradeForm,dispatch,location} = this.props;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'remitFormValue',
        newValue:{
          borrCardNo:item.key,
          borrCardNoDesc:item.value
        }
      }
    });

    dispatch(routerRedux.goBack());

  },
  render() {
    let {tradeForm,dispatch,location} = this.props;
    let {selectValue} = location.state;
    let dataSource = tradeForm.payeeAccountList;
    if(!dataSource)
      dataSource = [];
    return (<div>
      <List>
        {dataSource.map(i => (
          <RadioItem key={i.key} checked={selectValue === i.key}  onTouchStart={(e)=>this.onChange(i,e)}>
           {i.value}
          </RadioItem>
        ))}
      </List>
    </div>);
  },
});

const PayeeAccount = (props)=> {
	const TitleProps = {title:'收款人账户'};
	return (
		<div className={proMarketStyles.container}>
			<Title {...TitleProps} />
			<SelectAccount {...props}/>
		</div>
		)
}

function connectTradeFunc({tradeForm})
{
   return {tradeForm};
}

export default connect(connectTradeFunc)(PayeeAccount);
