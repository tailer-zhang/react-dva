import React, { Component,PropTypes } from 'react';
import { List,WhiteSpace } from 'antd-mobile';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import Title from '../../components/product/Title';
import Dic from '../../utils/dictionary.js';

const Item = List.Item;
const Brief = Item.Brief;

export default class CustomerConfAmt extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let { dispatch,location } = this.props;
    let rowData = location.state.rowData;
    let titlePtops ={
        title:'交易确认份额详情'
    }
    return(
      <div>
        <Title {...titlePtops}/>
        <WhiteSpace />
        <List>
          <Item extra={Dic.fetchDicValue('tradCode1',rowData.tradCode)}>交易类型</Item>
        </List>
          <WhiteSpace/>
        <List>
          <Item extra={rowData.reqAmt}>申请金额</Item>
          <Item extra={rowData.reqShr}>申请份额</Item>
          <Item extra={rowData.confAmt}>确认金额</Item>
          <Item extra={rowData.confShr}>确认份额</Item>
          <Item extra={rowData.confNetVal}>确认净值</Item>
        </List>
        <WhiteSpace />
        <List>
          <Item extra={rowData.confDate}>确认时间</Item>
        </List>
      </div>
    );
  }
}
