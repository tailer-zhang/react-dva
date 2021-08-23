// 机构客户添加页面-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import { Tabs, WhiteSpace,Toast } from 'antd-mobile';
import Title from '../../components/product/Title';//顶部标题和返回按钮组件
import OrgCusAddFirst from '../../components/customer/OrgCusAddFirst';
import OrgCusAddTabs from '../../components/customer/OrgCusAddTabs';//机构客户添加tabs

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import proDetailStyles from '../../styles/product/ProductDetail.less';//样式文件
import { createForm } from 'rc-form';

let isRepeat = 0;
class OrgCusAdd extends React.Component{
  constructor(props) {
    super(props);
    isRepeat =0 ;
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

  render() {
    let {dispatch,form,formStorage,location,customer} = this.props;
    let {formValue,activeKey} = formStorage;
    let { getFieldProps,getFieldError} = form;
    if(location.state==undefined) location.state={};
    let {methord} = location.state;

    let TitleProps = {
      title:'机构客户添加',
      showBack: 'no'
    };
    if(location.query&&location.query.mode=='edit')
       TitleProps = {
        title:'机构客户编辑',
        };

    return (
      <div  className={PerCusDetailStyles.mainContent}>
        {/*<Title {...TitleProps} />*/}
        <div className={PerCusDetailStyles.boxScroll}>
        <div className={PerCusDetailStyles.inMainContent}>
          <OrgCusAddFirst dispatch={dispatch} form={form}
            formValue={formValue}
            onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)}
            isOnlyAdd={true}
          />
        </div>
        <div className={PerCusDetailStyles.write} onClick={()=>{
          if(isRepeat>=1) return;
          form.validateFields((error,value)=>{
            console.log('----------error',error,value);
            //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
            if(!error||(!error.busiName&&!error.linkName&&!error.linkSex&&!error.linkMobilePhone))
            {
              if(!value.isBenefitSelf&&!value.actualBenefit) {
                Toast.fail('受益人说明不能为空!',2);
                return;
              }
               isRepeat = 1;
               let saveValue = {...value};
               Toast.loading('录入中...',30,undefined,true);
               saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
               saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
               saveValue.badRecords=saveValue.badRecords?'02':'01';
               if(saveValue.certStartDate)
                 saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
               if(saveValue.certEndDate)
                 saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');


               dispatch({
                 type:'customer/addCustomer',
                 payload:{
                   params:saveValue,
                   backMethord:(data)=>{
                     isRepeat =0;
                     Toast.hide();
                     if(data&&data.code=='0')
                        dispatch(routerRedux.replace({
                          pathname: '/orgCusAddMore',
                          state: {
                            orgCust: {
                              ...saveValue,
                              busiID:data.object.busiID,
                              custClass:'02',
                              custID:data.object.busiID,
                            },
                            mode: 'addMore'
                          }
                        }));
                     else Toast.fail(data&&data.msg?data.msg:'客户录入错误!',2);
                     }

        // <div className={PerCusDetailStyles.inMainContent}>
        //   <OrgCusAddFirst dispatch={dispatch} form={form}
        //     formValue={formValue}
        //     onChangeMethord={this.onChangeMethord.bind(this)}
        //     saveFormMethord={this.saveFormMethord.bind(this)}
        //     isOnlyAdd={true}
        //   />
        // </div>
        // <div className={PerCusDetailStyles.write} onClick={()=>{
        //   if(isRepeat>=1) return;
        //   form.validateFields((error,value)=>{
        //     console.log('----------error',error,value);
        //     //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
        //     if(!error||(!error.busiName&&!error.linkName&&!error.linkSex&&!error.linkMobilePhone))
        //     {
        //       isRepeat =1;
        //        let saveValue = {...value};
        //        Toast.loading('录入中...',30,undefined,true);
        //        dispatch({
        //          type:'customer/addCustomer',
        //          payload:{
        //            params:saveValue,
        //            backMethord:(data)=>{
        //              isRepeat =0;
        //              Toast.hide();
        //              if(data&&data.code=='0')
        //                 dispatch(routerRedux.replace({
        //                   pathname: '/orgCusAddMore',
        //                   state: {
        //                     orgCust: {
        //                       ...saveValue,
        //                       busiID:data.object.busiID,
        //                       custClass:'02',
        //                       custID:data.object.busiID,
        //                     },
        //                     mode: 'addMore'
        //                   }
        //                 }));
        //              else Toast.fail(data&&data.msg?data.msg:'客户录入错误!',2);
                   }
                 });
              }
              else {
                Toast.fail('输入不能为空!',2);
              }
            });
            }}><span>录入更多</span>
          </div>
        </div>
        <div className={PerCusDetailStyles.footerBtn}>
          <div className={PerCusDetailStyles.save} style={{height:'1.30667rem'}} onClick={()=>{
            if(isRepeat>=1) return;
            form.validateFields((error,value)=>{
              console.log('----------error',error,value);
              //在没有错误或者手机号、性别、姓名必输项没有错误的情况下，保存客户
              if(!error||(!error.busiName&&!error.linkName&&!error.linkSex&&!error.linkMobilePhone))
              {
                if(!value.isBenefitSelf&&!value.actualBenefit) {
                  Toast.fail('受益人说明不能为空!',2);
                  return;
                }

                 let saveValue = {...value,};
                 isRepeat =1;
                 Toast.loading('保存中...',30,undefined,true);

                 saveValue.isBenefitSelf=saveValue.isBenefitSelf?'01':'02';
                 saveValue.isfmanForMember=saveValue.isfmanForMember?'01':'02';
                 saveValue.badRecords=saveValue.badRecords?'02':'01';
                 if(saveValue.certStartDate)
                   saveValue.certStartDate = saveValue.certStartDate.format('YYYY-MM-DD');
                 if(saveValue.certEndDate)
                   saveValue.certEndDate = saveValue.certEndDate.format('YYYY-MM-DD');

                 dispatch({
                   type:'customer/addCustomer',
                   payload:{
                     params:saveValue,
                     backMethord:(data)=>{
                     isRepeat =0;
                     Toast.hide();
                       if(data&&data.code=='0') {
                        if(methord == 'inquire') {
                          dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                            successTitle:'机构客户添加成功!',
                            backTitle:'返回客户列表页',
                            backMethord:()=>dispatch(routerRedux.push('/customerInquire'))
                          }}));
                        }
                        else {
                          dispatch(routerRedux.replace({pathname:'/optionSuccess',state:{
                            successTitle:'机构客户添加成功!',
                            backTitle:'返回客户主页面',
                          }}));
                        }
                       }
                       else Toast.fail(data&&data.msg?data.msg:'客户保存错误!',2);
                     }
                   }
                 });
              }
              else {
                Toast.fail('输入参数中存在错误!',2);
              }
            });
          }}>保存</div>
        </div>
      </div>
    )
  }
}

function connectCustomerFunc({customer,formStorage})
{
   return {customer,formStorage};
}

export default connect(connectCustomerFunc)(createForm()(OrgCusAdd));
