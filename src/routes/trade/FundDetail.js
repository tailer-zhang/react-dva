//客户资金详情 赵博文
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory } from 'dva/router';
import { List,WhiteSpace,TextareaItem } from 'antd-mobile';
import Title from '../../components/product/Title';
import Dic from '../../utils/dictionary';

const Item = List.Item;
const FundDetail = ({trade,dispatch,location}) => {
  const titleProps = {title: '客户资金详情'};
  let {custAmtDetail} = trade;
  console.log('----custAmtDetail---',custAmtDetail);
  return (
    <div>
      <Title {...titleProps} />
      <div>
        <List>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={custAmtDetail.reqSeq}>交易单号</Item>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={custAmtDetail.custName}>客户名称</Item>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={custAmtDetail.lendCardNo}>客户银行账号</Item>
          {
            // <Item extra={custAmtDetail.borrCardNo}>收款银行账号</Item>
          }
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={Dic.fetchDicValue('dealPayCurType',custAmtDetail.currType) }>币种</Item>
          <Item extra={custAmtDetail.amount}>转账金额</Item>
          <Item extra={custAmtDetail.tradDate}>打款日期</Item>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <TextareaItem title="核对说明" value={custAmtDetail.chkBalStat} autoHeight />
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={custAmtDetail.brahName}>所属分公司</Item>
          <Item extra={custAmtDetail.mgrName}>理财师</Item>
        </List>
      </div>
    </div>
  )
}

function connectTradeModel({trade})
{
  return {trade};
}

export default connect(connectTradeModel)(FundDetail);
