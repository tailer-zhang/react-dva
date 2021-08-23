import React from 'react';
import { List, Button } from 'antd-mobile';
import detailStyle from '../style/InvestorDetail.less';
import Title from '../../../../../components/product/Title';

const Item = List.Item;

export default class InvestorItemDetail extends React.Component {
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
    const dataSource = this.props.location.state.dataSource
    return (
      <div className={detailStyle.container} >
        <Title title="投资者详情" />
        <List className="my-list">
          <Item extra={dataSource.custName}>客户名称</Item>
          <Item extra={dataSource.sex === ' ' ? '--' : dataSource.sex}>性别</Item>
          <Item extra={dataSource.certType}>证件类型</Item>
          <Item extra={dataSource.certNo}>证件号码</Item>
          <Item extra={dataSource.inveType}>投资者类型</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={dataSource.saleOrg}>销售机构</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={dataSource.begDate ? dataSource.begDate : '--'}>认定开始日期</Item>
          <Item extra={dataSource.expiDate ? dataSource.expiDate : '--'}>认定结束日期</Item>
        </List>
        {this.renderLastSeparator()}
      </div>
    )
  }
}

