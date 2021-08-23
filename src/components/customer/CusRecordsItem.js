import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import PushFile from '../../components/share/PushFile';
import DataImg from '../../components/share/DataImg';
import tradeInfo from '../../styles/trade/redeem.less';
import recordsStyle from '../../styles/customer/recordsStyle.less'
import ApprProgress from '../../components/customer/ApprProgress'
import Dic from "../../utils/dictionary";

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function connectProps({ ItemDetailModel, rebutSpace, formStorage, }) {
  return { ItemDetailModel, rebutSpace, formStorage }
}

@connect(connectProps)
@createForm()
export default class CusRecordsItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {}
  }

  submit=()=>{}
  getOption0() {
    let {basic} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        changeType: 'modify',
        extra: basic.prodName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        changeType: 'modify',
        extra: basic.shrType,
        arrow: 'empty'
      }
    })
  }
  getOption1() {
    let {basic} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '客户名称',
        changeType: 'modify',
        extra: basic.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '证件信息',
        changeType: 'modify',
        extra: basic.certTypeName + '|' + basic.certNo,
        arrow: 'empty'
      }
    })
  }
  getOption2() {
    let {basic} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '原银行账户',
        extra: '',
        arrow: 'empty'
      }
    })
  }
  getOption3() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '新银行账户',
        extra: '',
        arrow: 'empty'
      }
    })
  }
  getOption4() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    let {formValue} = formStorage
    return({
      operName: {
        valueType: 'selfSelect',
        desc: '姓名',
        changeType: 'modify',
        extra: formValue.operName || '',
        arrow: 'empty'
      },
      operCertNo: {
        valueType: 'selfSelect',
        desc: '证件号',
        changeType: 'modify',
        extra: formValue.operCertNo || '',
        arrow: 'empty'
      },
      operCertType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        changeType: 'modify',
        extra: formValue.operCertType !== undefined ? Dic.fetchDicValue('bankCertType', formValue.operCertType) : '请选择',
        arrow: 'empty'
      },
    })
  }
  render(){
    const { dispatch,onChangeMethord,form, basic,bankImageList, bankImageList1, progressList} = this.props;
    let formValue = {}
    return (
      <div id='redbox'>
        <div style={{paddingBottom: '1rem'}}>
          <Tabs swipeable={false} animated={false}>
            <TabPane tab="基本信息" key="1">
              <div>
                <WhiteSpace/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>申请状态：{basic.confStatName}</p>
                  <p>申请时间：{basic.createTime}</p>
                </div>
                <WhiteSpace />
                <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>银行卡号：{basic.origCardNo}</p>
                  <p>开户行：{basic.origBankName}</p>
                </div>
                <WhiteSpace />
                <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <div className={recordsStyle.midContent} style={{backgroundColor: '#fff'}}>
                  <p>银行卡号：{basic.cardNo}</p>
                  <p>开户行：{basic.bankName}</p>
                </div>
              </div>
            </TabPane>
            {basic.custType==0 ? <TabPane tab="经办人信息" key="2">
              <Form options={this.getOption4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
              <WhiteSpace/>
            </TabPane> : null}
            <TabPane tab="附件信息" key="3">
              <DataImg dataSource={bankImageList} innerTtile={'换卡申请附件'}/>
              {basic.custType==0 ? <DataImg dataSource={bankImageList1} innerTtile={'经办人附件'}/> : null}
              <WhiteSpace/>
            </TabPane>
            <TabPane tab="审批进度" key="4">
              <ApprProgress progressList={progressList}/>
              <WhiteSpace/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
