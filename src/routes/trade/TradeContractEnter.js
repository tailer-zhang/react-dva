//合同录入 赵博文
import React,{Component} from 'react';
import {routerRedux } from 'dva/router';
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import Title from '../../components/product/Title';
import TradeEnterTabs from '../../components/trade/TradeEnterTabs';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/tradeEnterTabs.less';
import postpone from '../../styles/trade/postpone.less';

let isRepeat = 0;
class TradeContractEnter extends React.Component {

  constructor() {
    super();
    isRepeat = 0;
    this.state={
      isFixed: false,
    }
  }

  onChangeMethord(item,value,name)
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord()
  {
    let {dispatch,form} = this.props;
    let { getFieldProps,getFieldError} = form;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:form.getFieldsValue()
    });
  }

  onSubmit(optFlag) {
    // e.preventDefault();
    if(isRepeat>=1)
     return;
    let {dispatch,formStorage,form} = this.props;
    let {formValue,list} = formStorage;
    if(list.length>0) {
      form.validateFields((error,value)=>{
        console.log('------xx----error',error,value, formValue);
        if(error==null&&formValue.prodId&&formValue.kpiId&&formValue.custNameDesc&&value.effectDate)
        {
          isRepeat = 1;
          if(optFlag == '0'){
            Toast.loading('交易保存中...',30,undefined,true);
            let saveValue = {
              ...formValue,
              ...value,
              list: list,
            };
            let effectDate = {
              effectDate: saveValue.effectDate&&saveValue.effectDate.format ? saveValue.effectDate.format('YYYY-MM-DD') : null,
            }
            let param = {
              ...saveValue,
              ...effectDate,
              optFlag:'0',
            };
            dispatch({
              type:'tradeSafe/tradeSafeEnter',
              payload:{
                params:param,
                backMethord:(data)=>{
                  Toast.hide();
                  isRepeat = 0;
                  if(data&&data.code=='00')
                    dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                        successTitle:'合同保存成功!',
                        backTitle:'返回B类产品主页面',
                      }}));
                  // Toast.success('合同保存成功!',2);
                  else Toast.fail(data&&data.message?data.message:'合同录入保存错误!',2);
                }
              }
            });
          }else if(optFlag == '1'){
            Toast.loading('交易提交中...',30,undefined,true);
            let saveValue = {
              ...formValue,
              ...value,
              list: list,
            };
            let effectDate = {
              effectDate: saveValue.effectDate&&saveValue.effectDate.format ? saveValue.effectDate.format('YYYY-MM-DD') : null,
            }
            let param = {
              ...saveValue,
              ...effectDate,
              optFlag:'1',
            };
            dispatch({
              type:'tradeSafe/tradeSafeEnter',
              payload:{
                params:param,
                backMethord:(data)=>{
                  Toast.hide();
                  isRepeat = 0;
                  if(data&&data.code=='00')
                    dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                        successTitle:'合同录入成功!',
                        backTitle:'返回B类产品主页面',
                      }}));
                  else Toast.fail(data&&data.message?data.message:'合同录入提交错误!',2);
                }
              }
            });
          }
        }
        else {
          Toast.fail('输入参数中存在错误!',2);
        }
      });
    } else{
      Toast.info('至少有一条缴费记录',2)
    }
  }

  render() {
    const titleProps = {title: 'B类产品合同录入'};
    let {dispatch,form,formStorage,location,instiCustInfo} = this.props;
    let {formValue,activeKey,list} = formStorage;
    let { getFieldProps,getFieldError} = form;
    let isFixed = this.state.isFixed;
    return (
      <div className={styles.enter}>
        {/*<Title {...titleProps} />*/}
          <TradeEnterTabs dispatch={dispatch} form={form}
            formValue={formValue} list={list}
            defaultActiveKey={activeKey}
            onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)}
          />
{ /*         <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
*/}
        <div>
          <p className={postpone.shBtn} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.onSubmit.bind(this,'0')}>保存</p>
          <p className={postpone.shBtn1} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.onSubmit.bind(this,'1')}>提交</p>
        </div>
      </div>
    )
  }
}

function connectContEnter({tradeSafe,formStorage}) {
  return {tradeSafe,formStorage}
}

export default connect(connectContEnter)(createForm()(TradeContractEnter));
