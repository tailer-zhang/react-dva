//废弃 交易确认份额 赵博文

import React from 'react';
import { List,WhiteSpace } from 'antd-mobile';
import Title from '../../components/product/Title';

const Item = List.Item;
const TradeAffirmPortion = () => {
  const titleProps = {title: '交易确认份额'};
  return (
    <div>
      <Title {...titleProps} />
      <div style={{marginTop: '1.72rem'}}>
        <List>
          <WhiteSpace style={{background: '#efeff4',height: '0.4rem'}} />
          <Item extra="认购确认">交易类型</Item>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra="5,000,000.00">申请金额</Item>
          <Item extra="0">申请份额</Item>
          <Item extra="5,000,000.00">确认金额</Item>
          <Item extra="5,000,000.00">确认分额</Item>
          <Item extra="1.2564">确认净值</Item>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra="2017-01-04">确认时间</Item>
        </List>
      </div>
    </div>
  )
}

export default TradeAffirmPortion;
