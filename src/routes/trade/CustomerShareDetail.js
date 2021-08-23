//客户分红详情 赵博文

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { List,WhiteSpace } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import Title from '../../components/product/Title';

const Item = List.Item;
const CustomerShareDetail = ({ trade, dispatch, location }) => {
  const titleProps = { title: '客户分红详情' };
  const data = location.state;
  console.log('_________', data)
  return (
    <div>
      <Title {...titleProps} />
      <div>
        <List>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra={data.prodName}>产品名称</Item>
          <Item extra={data.shrType}>产品类别</Item>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra={data.custName}>客户名称</Item>
          <Item extra={data.certTypeName}>证件类型</Item>
          <Item extra={data.certNo}>证件号码</Item>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra={data.refundAmt}>预付金额(元)</Item>
          <Item extra={data.refundAbleDate}>预付时间</Item>
          <Item extra={data.refundReson ? data.refundReson : '--'}>划付原因</Item>
          <Item extra={data.payDay ? data.payDay : '--'}>付息天数</Item>
          <WhiteSpace style={{background: '#efeff4',height: '0.2667rem'}} />
          <Item extra={data.remark ? data.remark : '--'}>划付说明</Item>
        </List>
      </div>
    </div>
  )
}

function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(CustomerShareDetail);
