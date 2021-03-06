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
        <Title title="??????/??????????????????" />
        <List className="my-list">
          <Item extra={custName}>????????????</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={prodName}>????????????</Item>
          <Item extra={shrType}>????????????</Item>
          <Item extra={reqAmt}>????????????</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          <Item extra={dateType}>????????????</Item>
        </List>
        {this.renderSeparator()}
        <List className="my-list">
          {/*<Item extra={totRolfDay}>????????????</Item>*/}
          <Item extra={interestDate}>??????????????????</Item>
          {/*<Item extra={dataSource.payDateDes || '--'}>??????</Item>*/}
          {/*<Item extra={startProfRule}>???????????????</Item>*/}
          {/*<Item extra={realPayDate}>???????????????</Item>*/}
        </List>
        {this.renderSeparator()}
        {/*<List className="my-list">*/}
        {/*<Item extra={tradCode}>????????????</Item>*/}
        {/*<Item extra={reqSeq}>????????????</Item>*/}
        {/*</List>*/}
        {/*{this.renderSeparator()}*/}
        {this.renderLastSeparator()}
      </div>
    )
  }
}

