//个人客户添加  赵博文
import React,{Component} from 'react';
import Title from '../../components/product/Title';
import { List,InputItem,Toast } from 'antd-mobile';
// import PersonalCustomerCommon from '../../components/customer/PersonalCustomerCommon';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import PersonalCustAddMoreTabs from '../../components/customer/PersonalCustAddMoreTabs';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import styles from '../../styles/customer/PersonalCustomerIncrease.less'
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import PersonalCustomerCommon from '../../components/customer/PersonalCustomerCommon';
import {formatError} from '../../utils/formatUtils';


import MarketMonth from '../productPages/MarketMonth';
let isRepeat = 0;
class PersonalCustomerIncrease extends React.Component{
  constructor() {
    super();
    isRepeat = 0;
    this.state = {
       animating: false,
    };
  }

  onChangeMethord(item,value,name)
  {
    let {dispatch} = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
    dispatch(routerRedux.goBack());
  }

  sureSubmit(isAddMore)
  {
    if(isRepeat>=1) return;
    let { dispatch,location,customer,form,formStorage} = this.props;
    if(location.state==undefined) location.state={};
    let {methord} = location.state;
    form.validateFields((error,value)=>{
      console.log('error-------',error,value);
      if(!error||(!error.custName&&!error.sex&&!error.mobilePhone))
      {
        isRepeat = 1;
        Toast.loading(isAddMore?'提交中...':'保存中',30,undefined,true);
        // value = {...value,actualControl:value.custName,actualBenefit:value.custName};
        dispatch({
          type:'customer/addCustomer',
          payload:{
            params:value,
            mode:'personal',
            backMethord:(data)=>{
              isRepeat = 0;
              Toast.hide();
              console.log('----------客户添加结果----',data,value);
              if(data&&data.code=='0')
              {
                if(isAddMore)
                 dispatch(routerRedux.replace({pathname:'/personalLatentCustomerEdit',state:{
                   customer:{
                       ...value,
                       custID:data.object.custID,
                       custClass:'01'
                   },
                   mode:'addMore'
                 }}));
                else {
                  if(methord == 'inquire') dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'个人客户添加成功!',
                    backTitle:'返回客户列表页',
                    backMethord: ()=>dispatch(routerRedux.push({pathname:'/customerInquire'}))
                  }}));
                  else dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                    successTitle:'个人客户添加成功!',
                    backTitle:'返回客户主页面',
                  }}));
                }          //dispatch(routerRedux.goBack());
              }
              else Toast.fail(data&&data.msg?data.msg:'客户添加错误!',2);
            }
          }
        });
      }
      else {
          Toast.fail(formatError(error),2);
      }
    });
  }


  render() {
    let { dispatch,location,customer,form,formStorage} = this.props;
    let { getFieldProps,getFieldError} = form;
    let titleProps = {title: '个人客户添加',showBack: 'no'};
    return (
      <div>
        {/*<Title {...titleProps}/>*/}
        <PersonalCustomerCommon form={form} formValue={formStorage.formValue} dispatch={dispatch} isOnlyAdd={true}
             onChangeMethord={this.onChangeMethord.bind(this)} customer={customer}/>
        <div>
              <div className={styles.entery} onClick={this.sureSubmit.bind(this,true)}>
                <span>录入更多</span>
              </div>
              <div className={styles.save} onClick={this.sureSubmit.bind(this,false)}>
                <span>保存</span>
              </div>
        </div>

      </div>
    )
  }
}

function connectPerCustAdd({customer,formStorage}) {
  return {customer,formStorage}
}



export default connect(connectPerCustAdd)(createForm()(PersonalCustomerIncrease));
