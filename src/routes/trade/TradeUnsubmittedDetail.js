//未提交详情 刘燕芝
import React from 'react';
import TradeRejectCause from '../../components/trade/TradeRejectCause';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {Toast} from 'antd-mobile';
import Title from '../../components/product/Title';
import TradeRejectTabs from '../../components/trade/TradeRejectTabs';
import { createForm } from 'rc-form';
import styles from '../../styles/trade/tradeRejectDetail.less';
import postpone from '../../styles/trade/postpone.less';

let isRepeat = 0;
class TradeRejectDetail extends React.Component{
  constructor() {
    super();
    isRepeat = 0;
  }

  onChangeMethord(item,value,name)
  {
    let {dispatch,form,formStorage} = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord(payload)
  {
    let {dispatch,formStorage} = this.props;
    let formValue = formStorage.formValue;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }

  onSubmit(optFlag) {
    // e.preventDefault();
    if(isRepeat>=1)
      return;
    let {dispatch,form,formStorage,location,tradeSafe} = this.props;
    console.log('----------this.props',this.props);
    let {formValue,activeKey,list} = formStorage;
    form.validateFields((error,value)=>{
      console.log('----------error',error,value);
      if(error==null&&formValue.prodId&&formValue.kpiId)
      {
        isRepeat = 1;
        if(optFlag == '0'){
          Toast.loading('交易保存中...',30,undefined,true);
          let saveValue = {
            ...formValue,
            ...value,
            // effectDate: value.effectDate.format('YYYY-MM-DD'),
            list: list,
            id: formValue.id
          };
          let param = {
            ...saveValue,
            effectDate: saveValue.effectDate&&saveValue.effectDate.format ? saveValue.effectDate.format('YYYY-MM-DD') : null,
            optFlag:'0',
            custCode: 'haiyin',
          };
          dispatch({
            type:'tradeSafe/tradeSafeEnter',
            payload:{
              params:param,
              backMethord:(data)=>{
                isRepeat = 0;
                Toast.hide();
                if(data&&data.code=='00')
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:'合同录入保存成功!',
                      backTitle:'返回B类产品未提交列表页面',
                    }}));
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
          let param = {
            ...saveValue,
            effectDate: saveValue.effectDate&&saveValue.effectDate.format ? saveValue.effectDate.format('YYYY-MM-DD') : null,
            optFlag:'1',
            custCode: 'haiyin',
          };
          dispatch({
            type:'tradeSafe/tradeSafeEnter',
            payload:{
              params:param,
              backMethord:(data)=>{
                isRepeat = 0;
                Toast.hide();
                if(data&&data.code=='00')
                  dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                      successTitle:'合同录入成功!',
                      backTitle:'返回B类产品未提交列表页面',
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
  }



  render() {
    let {dispatch,form,formStorage,location,tradeSafe} = this.props;
    let {formValue,activeKey,list} = formStorage;
    let { getFieldProps,getFieldError} = form;
    const titleProps = {title: '未提交'};

    // console.log('---------formValue',formValue);


    // let dataSource = tradeSafe.tradeContractDetail;
    // if(dataSource==undefined) dataSource = [];
    // let insurModel = dataSource.insurModel;
    // if (insurModel==undefined) insurModel={};
    // console.log('insurModel',insurModel);
    //
    // if(popValue==undefined) popValue={};
    // let popList = popValue.list;
    //
    // console.log('---popValue--',popValue);

    return (
      <div>
        <Title {...titleProps}/>
        <div className={styles.boxScroll}>
          <TradeRejectTabs dispatch={dispatch}  location={location}
            form={form} formValue={formValue} recordList={list}
            defaultActiveKeyUn={activeKey}
            onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)}
          />
          <div style={{height: '6.93rem',backgroundColor: '#efeff4'}}></div>
        </div>
        <div className={styles.wrap}>
          <p className={postpone.shBtn} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.onSubmit.bind(this,'0')}>保存</p>
          <p className={postpone.shBtn1} style={{position:'fixed',zIndex:'99',cursor:'pointer', bottom: '0'}} onClick={this.onSubmit.bind(this,'1')}>提交</p>
        </div>
      </div>
    )
  }
}

function connectTradeReject({tradeSafe,formStorage}) {
  return {tradeSafe,formStorage}
}

export default connect(connectTradeReject)(createForm()(TradeRejectDetail));
