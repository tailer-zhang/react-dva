import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import detailStyle from '../style/approvedDetail.less';

const Item = List.Item;

@connect()
export default class ApprovedApply extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate() {
    return this.props.location.action === 'POP'
  }

  renderSeparator() {
    return (
      <p className={detailStyle.separate} />
    )
  }

  renderLastSeparator() {
    return (
      <p className={detailStyle.lastSeparate} />
    )
  }

  render() {
    const dataSource = this.props.dataSource
    return (
      <div className={detailStyle.container} >
        <List className={detailStyle.list}>
          <Item extra={dataSource.reqSeq}>申请单编号</Item>
        </List>
        {this.renderSeparator()}
        <List className={detailStyle.list}>
          <Item extra={dataSource.custName}>客户名称</Item>
          <Item extra={dataSource.custTypeName}>客户类型</Item>
          <Item extra={dataSource.certTypeName}>证件类型</Item>
          <Item extra={dataSource.certNo}>证件号码</Item>
        </List>
        {this.renderSeparator()}
        <List className={detailStyle.list}>
          <Item extra={dataSource.managerName}>管理人</Item>
          <Item extra={dataSource.prodNames}>产品名称</Item>
        </List>
        {this.renderSeparator()}
        <List className={detailStyle.list}>
          <Item extra={dataSource.formatName}>格式</Item>
          <Item extra={dataSource.remark}>用途</Item>
        </List>
        {this.renderSeparator()}
        <p style={{ height: '3rem' }} />
      </div>
    )
  }
}

