//银行卡维护 新增银行账户  以及银行卡维护
import React,{ Component,PropTypes } from 'react';
import Titles from '../../components/product/Titles';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import Dic from '../../utils/dictionary';
import { List, InputItem,Toast } from 'antd-mobile';
import newUserStyles from '../../styles/customer/bankCard.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';
import { createForm } from 'rc-form';
import Form from '../../utils/form';
import Title from "../../components/product/Title";
import {Tool} from "../../utils/tools";

class NewBankId extends React.Component{
  constructor(props) {
    super(props);
    // this.listenerFun = this.listenerFun.bind(this)
    this.state = {
      scan: false,
    };
  }
  componentDidMount() {
    let that = this
    console.log('zoulema3?')
    let u = navigator.userAgent;
     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let  tradeMainContract = Tool.localItem('tradeMainContract')
    console.log('tradeMainContract1',tradeMainContract)
    if(tradeMainContract === '3.0'){
     window['sBank'] = function(data){
          console.log("银行卡扫描----->",data);
          let  temData = JSON.parse(data);
          console.log("银行卡扫描temData----->",temData);
          console.log("银行卡扫描bankName----->",temData.bankName);
          console.log("银行卡扫描cardNo----->",temData.cardNo);
              console.log('ceshiz zz8')
              that.renderFn(temData)
        };
    }else{
        window.addEventListener('message',that.listenerFun,false);
    }
   /* window.addEventListener('message', function (even) {
      console.log('zoulema2?')
      console.log("message=====",even)
    },false)*/
  }

  componentWillUnmount() {
    console.log('ceshiz zz1')
    let that = this
    let  tradeMainContract = Tool.localItem('tradeMainContract')
    console.log('tradeMainContract1',tradeMainContract)
    if(tradeMainContract === '3.0'){

    }else{
       window.removeEventListener('message',that.listenerFun,false)
    }

  }
  listenerFun=(e)=>{
    console.log('ceshiz zz7')
    let {formStorage} = this.props;
    console.log("eee22e",e.data)
    formStorage.bankFormValue.bankName = unescape(e.data.bankName.replace(/\\U/g, '%u'))
    console.log("formStorage.bankFormValue.bankName",formStorage.bankFormValue.bankName)
    formStorage.bankFormValue.cardNo = e.data.cardNo
    this.setState({ scan: true });
    console.log('formStorage.bankFormValue.bankName',formStorage.bankFormValue.bankName)
    console.log('formStorage.bankFormValue.cardNo',formStorage.bankFormValue.cardNo)
  }
  renderFn(temData){
      console.log("eee3temData",temData)
     let {formStorage} = this.props;
     let bankNameArr = temData.bankName.split('(')
        let bankNameStr = bankNameArr[0]
        formStorage.bankFormValue.bankName = bankNameStr
        console.log("formStorage.bankFormValue.bankName",formStorage.bankFormValue.bankName)
        formStorage.bankFormValue.cardNo = temData.cardNo
        this.setState({ scan: true });
        console.log('formStorage.bankFormValue.bankName',formStorage.bankFormValue.bankName)
        console.log('formStorage.bankFormValue.cardNo',formStorage.bankFormValue.cardNo)
  }
  onChangeMethord(item,value,name)
     {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'bankFormValue',
        newValue:payload
      }
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'bankFormValue',
        newValue:form.getFieldsValue()
      }
    });
  }
  save=()=>{
    let {dispatch,form,location,formStorage,} = this.props;
    const data = location.state.data;
    const mode = location.state.mode;
    const transInfo = location.state.transInfo || '';
    var reg = /^[\u4e00-\u9fa5]+$/;
    let tempBank = formStorage.bankFormValue&&formStorage.bankFormValue.bankName ? formStorage.bankFormValue.bankName: ''
    let tempCardNo = formStorage.bankFormValue&&formStorage.bankFormValue.cardNo ? formStorage.bankFormValue.cardNo: ''
    if(!tempBank.trim().length > 0){
      Toast.fail('请填写开户行',2);
      return
    }
    if(!reg.test(tempBank.trim())){
      Toast.fail('开户行请输入中文',2);
      return
    }
    if(tempCardNo.length < 6 || tempCardNo.length > 28){
      Toast.fail('银行卡号长度应在6~28位之间',2);
      return
    }
    const tradMode = location.state.tradMode;
    if(transInfo === '0'){
      let {dispatch} = this.props
      dispatch({
        type:'formStorage/fetch',
        payload:{
          transBank:{
            bankName: tempBank,
            cardNo: tempCardNo
          }
        }
      });
      history.go(-2)
      return;
    }
    if(mode=='change') {
      form.validateFields((error,value)=>{
        //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
        if(error==null)
        {
          Toast.loading('提交中...',30,undefined,true)
          let saveValue = {...value,
            custId:data.custId,
            id: data.id,
            version: data.version
          };
          dispatch({
            type:'bank/bankModify',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code=='00')
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:'银行卡修改成功!',
                      backTitle:'返回银行卡列表',
                    }}));
                else Toast.fail(data&&data.message?data.message:'银行卡保存错误!',2);
              }
            }
          });
        }
        else {
          Toast.fail('输入参数中存在错误!',2);
        }
      });
    } else{
      form.validateFields((error,value)=>{
        //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
        if(error==null)
        {
          Toast.loading('提交中...',30,undefined,true)
          let saveValue = {...value,
            custId: data.id,
            certType: data.certType,
            tradCode: data.tradCode || '',//合同编号
            orderNo: data.orderNo || '', //订单编号
            certNo: data.certNo,
            acctName: data.custName,
          };

          dispatch({
            type:'bank/bankCreate',
            payload:{
              params:saveValue,
              backMethord:(data)=>{
                Toast.hide();
                if(data&&data.code=='00'&&tradMode=='selectCustomerAccount')
                {
                  dispatch(routerRedux.goBack());
                }
                else if(data&&data.code=='00')
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:'银行卡添加成功!',
                      backTitle: location.state.from && location.state.from == "selectBankCus"  ? '返回选择银行账户列表' : '返回银行卡维护列表'
                    }}));
                else Toast.fail(data&&data.message?data.message:'银行卡增加错误!',2);
              }
            }
          });
        }
        else {
          Toast.fail('输入参数中存在错误!',2);
        }
      });
    }
  }
  //银行卡扫描事件
  scan=(e)=>{
    e.stopPropagation()
    let u = navigator.userAgent;
     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let  tradeMainContract = Tool.localItem('tradeMainContract')
    console.log('tradeMainContract1',tradeMainContract)
    if(tradeMainContract === '3.0'){
       if(isAndroid){
           window.top.android_app.scanBankCard("{\"callback\":\"sBank\"}");
       }
       if(isiOS){
          window.top.webkit.messageHandlers.scanBankCard.postMessage("{\"callback\":\"sBank\"}");
       }
    }else{
        let isSao = {
          systemCode: "application_tradeapp",
          type: "bankCardPlugin"
        }
        console.log("90909090",isSao)
        window.parent.postMessage(isSao,'*');
    }

  }
  Trim(str)
  {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  getOption() {
    let {dispatch,form,formStorage,location,bank} = this.props;
    const data = location.state.data;
    console.log('formStorage.bankFormValue',formStorage.bankFormValue)
    const mode = location.state.mode;
    return({
      accountName: {
        valueType: 'selfSelect',
        desc: '户名',
        changeType: 'modify',
        extra: mode == 'change' ? data.acctName : data.custName,
        arrow: 'empty'
      },
      accountType: {
        valueType: 'selfSelect',
        desc: '开户证件',
        changeType: 'modify',
        extra:  Dic.fetchDicValue('bankCertType',data.certType) + ' | ' + data.certNo,
        arrow: 'empty'
      },
      bankName: {
        required:true,
        type: 'text',
        changeType: 'modify',
        desc:'开户行',
        placeholder: '请输入'
      },
      cardNo: {
        required: true,
        changeType: 'modify',
        type: 'number',
        desc: '银行卡号',
        trigger: 'onBlur',
        placeholder: '6-28银行卡号',
        errMsg: '银行卡号号码非法!',
      },
    })
  }

  render() {
    let TitleProp = {title:'新增银行卡', showBack: 'yes'};

    let {dispatch,form,formStorage,location,bank} = this.props;
    let {bankFormValue,activeKey} = formStorage;
    const mode = location.state.mode;
    if(mode=='change') TitleProp = {title:'银行卡修改',};

    return (
      <div className={newUserStyles.newBankIdBox}>
        <Title {...TitleProp} />
        <p className={newUserStyles.pFull}></p>
        <div className={newUserStyles.card}>
          <List>
            <Form dispatch={dispatch} options={this.getOption()}
              form={form} formValue={bankFormValue}
             onChangeMethord={this.onChangeMethord.bind(this)}
            />
          </List>
        </div>
        <div className={newUserStyles.bankScan} onClick={this.scan.bind(this)}></div>
        <div className={proDetailStyles.orderBtn} onClick={this.save}>
          <span>保存</span>
        </div>
      </div>
    );
  }
};
function onFieldsChange(props, changedFields)
{
  let {dispatch, formStorage} = props;
  let myObject = formStorage.bankFormValue || {}
  if(changedFields.bankName)
  {
    let bankName = changedFields.bankName;
    myObject.bankName = bankName.value
    dispatch({
      type:'formStorage/fetch',
      payload:{
        bankFormValue:myObject
      }
    });
  }
  if(changedFields.cardNo)
  {
    let cardNo = changedFields.cardNo;
    myObject.cardNo = cardNo.value
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        bankFormValue:myObject
      },
    });
  }
}
function connectNewBank({bank,formStorage}) {
  return {bank,formStorage}
}

NewBankId = createForm()(NewBankId);

export default connect(connectNewBank)(createForm({onFieldsChange:onFieldsChange})(NewBankId));
