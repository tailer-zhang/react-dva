import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import Form from '../../utils/form';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import proDetailStyles from '../../styles/product/ProductDetail.less';//样式文件

export default class OrgCusAddFirst extends React.Component{

  constructor(props) {
    super(props);
  }

  switchOnChange(key,value)
  {
    console.log("value----------====",value);
    let {dispatch,formValue} = this.props;
    console.log("isBenefitSelf===",formValue.isBenefitSelf )
    let payload  = {};
    payload[key] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }

  renderOptions() {
    let {dispatch,formValue,onChangeMethord,saveFormMethord,form,isOnlyAdd} = this.props;
    return(
      {
        busiName: {
          type: 'text',
          required:true,
          desc:'机构名称',
          /*otherProps:{
              onBlur:(value)=>{
                  if(value){
                      dispatch(
                          {
                              type:'formStorage/fetchFormValue',
                              payload:{
                                  actualBenefit:value,
                              }
                          }
                      );
                      form.setFieldsValue({
                          actualBenefit:value,
                      });
                  }

              }
          }*/
        },
        legalMen: {
          required:!isOnlyAdd,
          trigger:'onBlur',
          errMsg:'',
          desc:'法定代表人',
          otherProps:{
              onBlur:(value)=>{
                  if(value){
                      dispatch(
                          {
                              type:'formStorage/fetchFormValue',
                              payload:{
                                  actualControl:value,
                              }
                          }
                      );
                      form.setFieldsValue({
                          actualControl:value,
                      });
                  }

              }
          }
        },
        actualControl:{
          // required:!isOnlyAdd,
          required:true,
          trigger:'onBlur',
          errMsg:'控制人说明不能为空!',
          desc:'控股股东或实际控制人'
        },
        isBenefitSelf:{
          required: true,
          valueType:'switch',
          desc:'是否本人受益',
          onChangeMethord: (value) => this.switchOnChange('isBenefitSelf', value)
        },
        actualBenefit: {
          // required: !formValue.isBenefitSelf,
          trigger: 'onBlur',
          numberOfLines: 1,
          validatorType: 'length300',
          errMsg: '受益人说明不能为空！',
          desc: '请说明'
        },
        linkName: {
          type: 'text',
          required:true,
          desc:'主联系人姓名'
        },
        linkSex: {
          type: Dic.fetchDicList('gender'),
          required:true,
          valueType:'select',
          desc:'主联系人性别',
          title:'主联系人性别',
        },
        linkMobilePhone: {
          type: 'text',
          required:true,
          trigger:'onBlur',
          validatorType:'phone',
          errMsg:'手机输入格式非法!',
          desc:'主联系人手机'
        },
        remark1:{
          required:true,
          valueType:'select',
          type:Dic.fetchDicList('custSource'),
          title:'客户来源',
          initialValue:formValue.remark1,
          desc:'客户来源'
        },
      }
    )
  }

  render() {
    let {dispatch,formValue,onChangeMethord,saveFormMethord,form,wrapStyle} = this.props;
    let { getFieldProps,getFieldError} = form;

    if(formValue==undefined) {
      formValue = {};
    }
    if(formValue.isBenefitSelf===undefined || formValue.isBenefitSelf==='' || formValue.isBenefitSelf ==='01'){
      formValue.isBenefitSelf=true;
    }


    return(
      <div className={PerCusDetailStyles.basicInfoWrap} id={this.props.id}>
        <div className={PerCusDetailStyles.infoWrap} style={wrapStyle}>
          <Form  options={this.renderOptions()} dispatch={dispatch} formValue={formValue}
           form={form} onChangeMethord={onChangeMethord} />
        </div>
      </div>
    )
  }
}
