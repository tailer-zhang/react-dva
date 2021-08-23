import React from 'react';
import { List, Button } from 'antd-mobile';
import detailStyle from '../../bi_type_manage/investors_search/style/InvestorDetail.less';
import Title from '../../../../components/product/Title';
import Dic from '../../../../utils/dictionary';

const Item = List.Item;

export default class InterestDetail extends React.Component {
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
    const custName = dataSource.custName && dataSource.custName !== 'undefined' ? dataSource.custName : '--'
    const prodName = dataSource.prodName && dataSource.prodName !== 'undefined' ? dataSource.prodName : '--'
    const shrType = dataSource.shrType && dataSource.shrType !== 'undefined' ? dataSource.shrType : '--'
    const contNo = dataSource.contNo && dataSource.contNo !== 'undefined' ? dataSource.contNo : '--'
    const reqAmt = dataSource.reqAmt && dataSource.reqAmt !== 'undefined' ? dataSource.reqAmt : '--'
    const currType = dataSource.currType && dataSource.currType !== 'undefined' ? Dic.fetchDicValue('payCurType', dataSource.currType) : '--'
    const dateType = dataSource.dateType && dataSource.dateType !== 'undefined' ? dataSource.dateType : '--'
    const totRolfDay = dataSource.totRolfDay && dataSource.totRolfDay !== 'undefined' ? dataSource.totRolfDay : '--'
    const interestDate = dataSource.interestDate && dataSource.interestDate !== 'undefined' ? dataSource.interestDate : '--'
    const startProfRule = dataSource.startProfRule && dataSource.startProfRule !== 'undefined' ? dataSource.startProfRule : '--'
    const realPayDate = dataSource.realPayDate && dataSource.realPayDate !== 'undefined' ? dataSource.realPayDate : '--'
    const tradCode = dataSource.tradCode && dataSource.tradCode !== 'undefined' ? Dic.fetchDicValue('tradCode', dataSource.tradCode) : '--'
    const reqSeq = dataSource.reqSeq && dataSource.reqSeq !== 'undefined' ? dataSource.reqSeq : '--'
    return (
      <div className={detailStyle.container} >
        <Title title="付息/到期提醒详情" />
        <List className="my-list">
          <Item extra={custName}>客户名称</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={prodName}>产品名称</Item>
          <Item extra={shrType}>产品类别</Item>
          <Item extra={reqAmt}>交易金额</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={dateType}>分配类型</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          {/*<Item extra={totRolfDay}>收益天数</Item>*/}
          <Item extra={interestDate}>付息基准日期</Item>
          {/*<Item extra={dataSource.payDateDes || '--'}>备注</Item>*/}
          {/*<Item extra={startProfRule}>起息日规则</Item>*/}
          {/*<Item extra={realPayDate}>实际划付日</Item>*/}
        </List>
        {this.renderSeparator()}
        {/*<List className="my-list">*/}
        {/*<Item extra={tradCode}>交易类型</Item>*/}
        {/*<Item extra={reqSeq}>交易单号</Item>*/}
        {/*</List>*/}
        {/*{this.renderSeparator()}*/}
        {this.renderLastSeparator()}
      </div>
    )
  }
}

