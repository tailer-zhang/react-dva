import React from 'react';
import { Tabs, WhiteSpace, List } from 'antd-mobile';
import Title from '../../../../../components/product/Title';
import { createForm } from 'rc-form';
import UploadFiles from '../../utils/UploadFiles'
import Form from '../../../../../utils/form';
import DetailStyle from '../style/detail.less';
import Timeline from '../../utils/Timeline'

const TabPane = Tabs.TabPane;

@createForm()
export default class SearchItemDetailCnt extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  getOptions() {
    return ({
      prodName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: '银领定增',
        arrow: 'empty',
      },
      prodCode: {
        valueType: 'selfSelect',
        desc: '产品代码',
        extra: 'YK08976',
        arrow: 'empty',
      },
      customerName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        extra: '小小',
        arrow: 'empty',
      },
      cardNumber: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra: '923838457844',
        arrow: 'empty',
      },
      tradeType: {
        valueType: 'selfSelect',
        desc: '交易类型',
        extra: 'x',
        arrow: 'empty',
      },
      applyDate: {
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: '2017-09-01',
        arrow: 'empty',
      },
      applyAmount: {
        valueType: 'selfSelect',
        desc: '申请金额(元)',
        extra: '2342',
        arrow: 'empty',
      },
      applyPortion: {
        valueType: 'selfSelect',
        desc: '申请份额(份)',
        extra: '23',
        arrow: 'empty',
      },
      acceptor: {
        valueType: 'selfSelect',
        desc: '受理人员',
        extra: '小田',
        arrow: 'empty',
      },
      recordDtate: {
        valueType: 'selfSelect',
        desc: '录像时间',
        extra: '2017-09-01',
        arrow: 'empty',
      },
      recheckState: {
        valueType: 'selfSelect',
        desc: '复核状态',
        extra: '通过',
        arrow: 'empty',
      },
    })
  }

  render() {
    const { form } = this.props;
    const formValue = {}
    return (
      <div className={DetailStyle.container}>
        <Title title={'双录入详情'} showBack={'yes'} />
        <div >
          <Tabs defaultActiveKey="1" swipeable={false} animated={false} >
            <TabPane tab="客户信息" key="1" />
            <TabPane tab="资料信息" key="2" />
            <TabPane tab="操作流水" key="3" />
          </Tabs>
          <WhiteSpace />
          <List>
            <Form
              options={this.getOptions()} form={form} formValue={formValue}
            />
          </List>
          <UploadFiles />
          <WhiteSpace />
          <Timeline />
        </div>
      </div>
    )
  }
}

