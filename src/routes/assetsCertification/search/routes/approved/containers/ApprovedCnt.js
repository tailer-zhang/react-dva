import React, { Component } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import ApprovedFile from '../components/ApprovedFile'
import ApprovedApply from '../components/ApprovedApply'
import PrintLog from '../components/PrintLog'
import Title from '../../../../../../components/product/Title';
import { List, WhiteSpace, Tabs, InputItem, Toast } from 'antd-mobile';

const TabPane = Tabs.TabPane;
const Item = List.Item;

function connectProps({ ApprovedModel }) {
  return { ApprovedModel }
}

@connect(connectProps)
export default class ApprovedCnt extends Component {
  constructor() {
    super()
    this.state = {}
  }

  clickTab= () => {
    console.log('click')
  }

  render() {
    const { location, ApprovedModel } = this.props
    const { dataSource } = location.state
    const fileList = ApprovedModel.fileList
    const logList = ApprovedModel.logList
    return (
      <div>
        <Title title={"资产证明申请详情"} showBack={'yes'} />
        <Tabs swipeable={false} animated={false} onTabClick={this.clickTab}>
          <TabPane tab="资产证明文件" key="1">
            <WhiteSpace />
            <WhiteSpace />
            <ApprovedFile fileList={fileList} />
          </TabPane>
          <TabPane tab="资产证明申请" key="2">
            <WhiteSpace />
            <WhiteSpace />
            <ApprovedApply dataSource={dataSource} />
          </TabPane>
          <TabPane tab="打印记录" key="3">
            <PrintLog logList={logList} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
