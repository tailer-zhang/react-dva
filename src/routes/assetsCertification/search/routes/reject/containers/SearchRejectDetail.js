import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace } from 'antd-mobile';
import detailStyle from '../style/rejectStyle.less';
import Title from '../../../../../../components/product/Title';

const Item = List.Item;

function connectStateToprops({ AssetsRejectModel }) {
  return { AssetsRejectModel }
}

@connect(connectStateToprops)
export default class SearchRejectDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
    const { AssetsRejectModel } = this.props;
    const reason = AssetsRejectModel.reason
    return (
      <div className={detailStyle.container} >
        <Title title={'资产证明申请详情'} showBack={'yes'} />
        <p className={detailStyle.section1}>驳回详情</p>
        <div className={detailStyle.head}>
          <p>驳回原因<span>{reason.remark}</span></p>
          <p>&nbsp;&nbsp;&nbsp;驳回人<span>{reason.rejector}</span></p>
          <p>驳回时间<span>{reason.rejectTime}</span></p>
        </div>
        <WhiteSpace />
        <p className={detailStyle.section1}>资产证明申请</p>
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

