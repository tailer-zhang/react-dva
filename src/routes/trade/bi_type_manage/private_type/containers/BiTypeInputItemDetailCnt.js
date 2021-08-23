import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Button } from 'antd-mobile';
import detailStyle from '../style/detail.less';
import Dic from '../../../../../utils/dictionary';
import Title from '../../../../../components/product/Title';

const Item = List.Item;
const titleProps = {
  title: '交易详情',
};

class BiTypeInputItemDetailCnt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate() {
    return this.props.location.action === 'POP'
  }

  apply= () => {
    this.props.dispatch(routerRedux.push({ pathname: '/applyCnt', state: { from: 'private', dataSource: this.props.location.state } }))
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
    const data = this.props.location.state
    console.log('😁好', data)
    return (
      <div className={detailStyle.container} >
        <div className={detailStyle.box}>
          <Title {...titleProps} />
          <List className={detailStyle.list}>
            <Item className="item" extra={data.reqSeq}>申请单编号</Item>
            <Item extra={data.contNo}>合同编号</Item>
            <Item extra={Dic.fetchDicValue('tradCode', data.tradCode)}>交易类型</Item>
          </List>
          {this.renderSeparator()}
          <List className={detailStyle.list}>
            <Item extra={data.custName}>客户名称</Item>
            <Item extra={data.inveTypeName}>投资者类型</Item>
          </List>
          {this.renderSeparator()}
          <List className={detailStyle.list}>
            <Item extra={data.prodName}>产品名称</Item>
            <Item extra={data.prodExpiName}>产品类别</Item>
          </List>
          {this.renderSeparator()}
          <List className={detailStyle.list}>
            <Item extra={data.endDate}>到期日</Item>
            <Item extra={data.remitDate}>申请日</Item>
          </List>
          {this.renderSeparator()}
          <List className={detailStyle.list}>
            <Item extra={data.reqShr}>申请份额(份)</Item>
            <Item extra={data.reqAmt}>申请金额</Item>
            <Item extra={data.fee}>手续费</Item>
            <Item extra={data.currTypeName}>币种</Item>
          </List>
          <p style={{height:'3rem'}}></p>
        </div>
        <Button className={detailStyle.btn} activeStyle={false} onClick={this.apply}>录入</Button>
      </div>
    )
  }
}

export default connect()(BiTypeInputItemDetailCnt)

