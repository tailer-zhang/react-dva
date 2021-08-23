import React,{Component,PropTypes} from 'react';
import { Tabs, WhiteSpace, Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import 'moment/locale/zh-cn';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import tradeInfo from '../../styles/trade/redeem.less';
import transfer from '../../styles/trade/transfer.less';
import changeStyle from '../../styles/customer/accountChange.less'
import getNameOfBank from "../../utils/Bank";
import Dic from '../../utils/dictionary';
import * as Commons from "../../utils/commonUtil";
import recordsStyle from '../../styles/customer/recordsStyle.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
import postpone from '../../styles/trade/postpone.less';
import DataImg from '../share/DataImg';
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const TabPane = Tabs.TabPane;
let isRepeat = 0;

function onFieldsChange(props, changedFields)
{
  let {dispatch,formStorage} = props;
  console.log('changedFields',changedFields)
  let myObject = formStorage.formValue || {}
  console.log('#####',myObject)
  //转让日期
  if(changedFields.remitDate && changedFields.remitDate.value)
  {
    let value = changedFields.remitDate.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        remitDate:value
      },
    });
  }
  //转让金额
  if(changedFields.transferAmount && changedFields.transferAmount.value)
  {
    let value = changedFields.transferAmount.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferAmount:value
      },
    });
  }
  //转让份额
  if(changedFields.transferShare && changedFields.transferShare.value)
  {
    let value = changedFields.transferShare.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferShare:value
      },
    });
  }
  //转让手续费
  if(changedFields.transferChar && changedFields.transferChar.value)
  {
    let value = changedFields.transferChar.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        transferChar:value
      },
    });
  }
  //转让方经办人姓名
  if(changedFields.operName && changedFields.operName.value)
  {
    let value = changedFields.operName.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operName:value
      },
    });
  }
  //转让方经办人证件号
  if(changedFields.operCertNo && changedFields.operCertNo.value)
  {
    let value = changedFields.operCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operCertNo:value
      },
    });
  }
  //转让方经办人证件类型
  if(changedFields.operCertType && changedFields.operCertType.value)
  {
    let value = changedFields.operCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        operCertType:value
      },
    });
  }
  //输入的受让人姓名
  if(changedFields.assiCustNameDesc && changedFields.assiCustNameDesc.value)
  {
    let value = changedFields.assiCustNameDesc.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustNameDesc:value
      },
    });
  }
  //输入的受让人证件号码
  if(changedFields.assiCustCertNo && changedFields.assiCustCertNo.value)
  {
    let value = changedFields.assiCustCertNo.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustCertNo:value
      },
    });
  }
  //输入的受让人证件类型
  if(changedFields.assiCustCertType && changedFields.assiCustCertType.value)
  {
    let value = changedFields.assiCustCertType.value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        assiCustCertType:value
      },
    });
  }
  if(myObject && myObject.assiCustNameDesc && myObject.assiCustCertNo ){
    console.log('12121!@!@!@@')
  }
}

@connect()
@createForm({onFieldsChange:onFieldsChange})
export default class TransferRejectItem extends React.Component{
  constructor(props){
    super(props);
    isRepeat = 0;
    this.state = {
    }
  }

  componentDidMount()
  {
    let _this = this
    //监听cordova回调的数据
    window.addEventListener('message',_this.onMessage,false);
  }
  componentWillUnmount(){
    let _this = this
    window.removeEventListener('message',_this.onMessage,false)
  }

  dataURLtoFile(dataurl, filename) {//将base64转换为文件
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }



  getOption0() {
    let {dispatch,formStorage,details} = this.props;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '产品名称',
        extra: details&&details.prodName?details.prodName:'--',
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: details&&details.prodExpiName ? details.prodExpiName : '--',
        arrow: 'empty'
      },
    })
  }
  // 管理人客户转入的时候需要选择产品名称和产品类别
  getOption7() {
    let {dispatch,formStorage,details} = this.props;
    return({
      prodId: {
        valueType: 'selfSelect',
        desc: '产品名称',
        arrow: 'empty',
        extra:details&&details.prodName?details.prodName:'--',
      },
      kpiId: {
        valueType: 'selfSelect',
        desc: '产品类别',
        extra: details&&details.prodExpiName ? details.prodExpiName : '--',
        arrow: 'empty'
      },
    })
  }
  getOption1() {
    let {dispatch,form,formStorage,location,bank,details} = this.props;
    return({
      remitDate:{
        valueType: 'selfSelect',
        desc: '申请日期',
        extra: details&&details.remitDate ? details.remitDate : '--',
        arrow: 'empty'
      },
      transferShare: {
        valueType: 'selfSelect',
        desc:'转让份额',
        placeholder: '请输入转让份额',
        extra: details&&details.reqShr ? details.reqShr : '--',
        arrow: 'empty'
      },
      transferAmount: {
        valueType: 'selfSelect',
        desc:'转让金额',
        placeholder: '请输入转让金额',
        extra: details&&details.reqAmt ? details.reqAmt : '--',
        arrow: 'empty'
      },
      transferChar: {
        valueType: 'selfSelect',
        desc:'转让手续费',
        placeholder: '请输入转让手续费',
        extra: details&&details.fee ? details.fee : '--',
        arrow: 'empty'
      },


    })
  }
  //转让方信息
  getOption2() {
    let {details} = this.props;
    return({
      custName: {
        valueType: 'selfSelect',
        desc: '客户姓名',
        extra: details&&details.custName? details.custName : '--',
        arrow: 'empty'
      },
      certType: {
        valueType: 'selfSelect',
        desc: '证件类型',
        extra: details&&details.certTypeName? details.certTypeName : '--',
        arrow: 'empty'
      },
      certNo: {
        valueType: 'selfSelect',
        desc: '证件号码',
        extra: details&&details.certNo? details.certNo : '--',
        arrow: 'empty'
      },
      cardNo: {
        valueType: 'selfSelect',
        desc: '银行卡号',
        extra: details&&details.cardNo? details.cardNo : '--',
        arrow: 'empty'
      },
      bankNa: {
        valueType: 'selfSelect',
        desc: '开户行',
        extra: details&&details.bankNa? details.bankNa : '--',
        arrow: 'empty'
      }
    })
  }
  //转让方经办人信息
  getOption3() {
    let {details} = this.props;
    return({
      operator: {
        valueType: 'selfSelect',
        desc:'姓名',
        placeholder: '请输入',
        extra: details&&details.operator ? details.operator : '--',
        arrow: 'empty'
      },
      operCertNo: {
        valueType: 'selfSelect',
        desc:'证件号',
        placeholder: '请输入',
        extra: details&&details.operCertNo ? details.operCertNo : '--',
        arrow: 'empty'
      },
      operCertTypeName: {
        valueType: 'selfSelect',
        desc: '证件类型',
        title: '证件类型',
        extra: details&&details.operCertTypeName ? details.operCertTypeName : '--',
        arrow: 'empty'
      },
    })
  }
//受让方信息
  getOption4() {
    let {details} = this.props;
    console.log('detailsdetailsdetailsdetailsdetails',details)
    return({
      targetName: {
        valueType: 'selfSelect',
        desc:'受让人姓名',
        placeholder: '请输入受让人姓名',
        extra:details&&details.targetName ? details.targetName : '--',
        arrow: 'empty'
      },
      targetCertNo: {
        valueType: 'selfSelect',
        desc:'证件号',
        placeholder: '请输入证件号',
        extra: details&&details.targetCertNo ? details.targetCertNo : '--',
        arrow: 'empty'
      },
      targetCertTypeName: {
        valueType: 'selfSelect',
        desc: '证件类型',
        title: '证件类型',
        extra: details&&details.targetCertTypeName ? details.targetCertTypeName : '--',
        arrow: 'empty'
      }
    })
  }
  getOption5() {
    let {details} = this.props;
    return({
      targetCardNo: {
        valueType: 'selfSelect',
        title:'银行卡号',
        desc: '银行卡号',
        extra:details&&details.targetCardNo ? details.targetCardNo.split("(")[1].split(")")[0] : '--',
        arrow: 'empty'
      },
      assiOpenBank: {
        valueType: 'selfSelect',
        desc:'开户行',
        extra: details&&details.targetCardNo ? details.targetCardNo.split("(")[0] : '--',
        arrow: 'empty'
      },
    })
  }
  //受让方经办人信息
  getOption6() {
    let {details} = this.props;
    return({
      targOperator: {
        valueType: 'selfSelect',
        desc:'姓名',
        placeholder: '请输入',
        extra: details&&details.targOperator ? details.targOperator : '--',
        arrow: 'empty'
      },
      targOperCertNo: {
        valueType: 'selfSelect',
        desc:'证件号',
        placeholder: '请输入',
        extra: details&&details.targOperCertNo ? details.targOperCertNo : '--',
        arrow: 'empty'
      },
      targOperCertTypeName: {
        valueType: 'selfSelect',
        desc: '证件类型',
        title: '证件类型',
        extra: details&&details.targOperCertTypeName ? details.targOperCertTypeName : '--',
        arrow: 'empty'
      },
    })
  }
  tabClick(key)
  {
    let {dispatch} = this.props;
    dispatch({
      type:'formStorage/fetch',
      payload:{
        defaultActiveKey:key
      }
    });
  }
  //作废
  submit=()=>{
    let {details,dispatch} = this.props;
    console.log('zoulema   zuofei de ',details)
    dispatch({
      type:'rebutSpace/fetchTradeCancel',
      payload:{reqId:details.id,mgrCode:details.mgrCode,
        backMethord:(data)=>{
          if(data&&data.code === '00'){
            Toast.success('作废成功！')
            setTimeout(function () {
              history.go(-1)
            }, 1000)
          }else {
            Toast.fail(data&&data.message?data.message:'废除失败!',2);
          }
        }
      }
    });
  }
  //修改
  commit=()=>{
    const { dispatch,originData,form,formStorage, details,type,rejectFlag,rebutSpace,location} = this.props;
    let data = rebutSpace.model;
    console.log("ywywyy======================",data)
    this.props.dispatch(routerRedux.push({pathname:'/TransferRejectModify',state:{
        data:data,
        type:type,
        rejectFlag:'0'
      }}))
  }
  render(){
    const { dispatch,onChangeMethord,form,formStorage, details,type,rejectFlag,rebutSpace} = this.props;
    console.log('this.props11111111111111',this.props)
    const { defaultActiveKey } = formStorage;
    console.log('formStorage22222',formStorage)
    let data = rebutSpace.model;
    let attachInfo = data.attachList;
    let {formValue} = formStorage
    let tansferModel = ''
    if(type === '0'){
      tansferModel = '转给本人客户'
    }else if(type === '1'){
      tansferModel = '转给其他理财师客户'
    }else if(type === '2'){
      tansferModel = '转给管理人客户'
    }else if(type === '3'){
      tansferModel = '管理人客户转入'
    }
    return (
      <div className={tradeInfo.redbox}>
        <div className={tradeInfo.box}>
          {rejectFlag=='0'?( <div className={postpone.head}>
            <p>驳回原因<span style={{float:'right'}}>{data.noPassReason}</span></p>
            <p>驳回人/驳回时间<span style={{float:'right'}}>{data.appTime}</span><span style={{float:'right'}}>{data.appUserName}/</span></p>
          </div>):<div />}
          <Tabs swipeable={false} animated={false}
                onTabClick={this.tabClick.bind(this)}
                defaultActiveKey={defaultActiveKey?defaultActiveKey:'1'}>
            <TabPane tab="转让信息" key="1">
              <div>
                <WhiteSpace/>
                <div className={transfer.first}>
                  <div className={transfer.head_title}>
                    <p className={transfer.userName}>转受让模式</p>
                  </div>
                  <p className={transfer.rightText}>{tansferModel}</p>
                </div>
                <WhiteSpace/>
                <div className={transfer.first}>
                  <div className={transfer.head_title}>
                    <p className={transfer.userName}>交易信息</p>
                  </div>
                </div>
                {
                  (type == '3' ) ? <Form options={this.getOption7()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/> :
                    <Form options={this.getOption0()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                }
                <Form options={this.getOption1()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                <WhiteSpace />
                {
                  (type == '3' ) ? null :(
                    <div>
                      <div className={transfer.first}>
                        <div className={transfer.head_title}>
                          <p className={transfer.userName}>转让方信息</p>
                        </div>
                      </div>
                      <Form options={this.getOption2()}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                      <WhiteSpace />
                      {details&&details.custType==0 ? (
                          <div>
                            <div className={transfer.first}>
                              <div className={transfer.head_title}>
                                <p className={transfer.userName}>转让方经办人信息</p>
                              </div>
                            </div>
                            <Form options={this.getOption3()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                          </div>
                        )
                        : null}
                    </div>
                    )
                }


              </div>
            </TabPane>
            {
              ( type == '0' || type == '1'  || type == '3') ?
                (
                    <TabPane tab="受让信息" key="2">
                      <WhiteSpace />
                      <Form options={this.getOption4()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                      <Form options={this.getOption5()} dispatch={dispatch} formValue={formValue}  form={form} onChangeMethord={onChangeMethord}/>
                      {( details&&details.targCustType == '0')? (
                          <div>
                            <WhiteSpace />
                            <div className={transfer.first}>
                              <div className={transfer.head_title}>
                                <p className={transfer.userName}>受让方经办人信息</p>
                              </div>
                            </div>
                            <Form options={this.getOption6()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}/>
                          </div>
                        )
                        : null}
                      <WhiteSpace/>
                    </TabPane>
                )
                :null

            }
            <TabPane tab="转受让资料" key="3">
              <DataImg dataSource={attachInfo}/>
            </TabPane>
          </Tabs>
        </div>
        {rejectFlag=='0'?( <div>
          <p className={postpone.shBtn} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.submit}>作废</p>
          <p className={postpone.shBtn1} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.commit}>修改</p>
        </div>):<div />}
      </div>
    )
  }
}
