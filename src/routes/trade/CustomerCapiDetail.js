//客户资金详情 赵博文
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux,browserHistory } from 'dva/router';
import { List,WhiteSpace,TextareaItem } from 'antd-mobile';
import Title from '../../components/product/Title';
import {convertCurrency} from '../../utils/formatUtils';
import Dic from '../../utils/dictionary';

const Item = List.Item;
const CustomerCapiDetail = ({trade,dispatch,location}) => {
  const titleProps = {title: '汇款信详情'};
  const rowData = location.state;
  console.log('rowData=============',rowData);
  return (
    <div>
      <Title {...titleProps} />
      <div>
        <List>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={rowData.reqSeq}>交易单号</Item>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={rowData.lendCardNo}>客户银行账号</Item>
          {
            // <Item extra={rowData.borrCardNo}>收款银行账号</Item>
          }
          <Item extra={Dic.fetchDicValue('dealPayCurType',rowData.currType) }>币种</Item>
          <Item extra={rowData.amount}>转账金额(人民币)</Item>
          <Item extra={convertCurrency(rowData.amount)}>转账金额大写</Item>
          <Item extra={rowData.tradDate}>打款日期</Item>
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={rowData.chkBalStat}>核对状态</Item>
          <TextareaItem title="核对说明" value={rowData.chkBalStat} autoHeight />
          <WhiteSpace style={{height: '0.2667rem',backgroundColor: '#efeff4'}} />
          <Item extra={rowData.brahName}>所属分公司</Item>
          <Item extra={rowData.mgrName}>理财师</Item>
        </List>
      </div>
    </div>
  )
}

export default CustomerCapiDetail;
