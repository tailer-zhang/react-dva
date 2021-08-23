import React, { Component,PropTypes } from 'react';
import {Button, List,WhiteSpace} from "antd-mobile";
const Item = List.Item;


class RedeemLists extends React.Component{
    constructor(props) {
      super(props);
    }
    render() {
      let {dataSource} = this.props;
      return(
        <div>
              {
                dataSource.map((item,index)=>{
                  return (
                    <div key={index}>
                      <List>
                        <Item  extra={item.shrType}>份额类别</Item>
                        <Item  extra={item.totShr}>总份额</Item>
                        <Item  extra={item.openDate}>开放期</Item>
                        <Item  extra={item.avlShr}>可用份额</Item>
                        <Item  extra={item.tradShr}>冻结份额</Item>
                        <Item  extra={item.reserveBegDate}>可赎回预约开始日期</Item>
                        <Item  extra={item.reserveEndDate}>可赎回预约结束日期</Item>
                      </List>
                      <WhiteSpace />
                    </div>
                  )
                })
              }


        </div>
      )
    }
}

export default RedeemLists
