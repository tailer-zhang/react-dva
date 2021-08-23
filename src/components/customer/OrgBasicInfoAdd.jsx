import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link ,routerRedux} from 'dva/router';
import { List, Switch, InputItem, DatePicker,WhiteSpace } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import Form from '../../utils/form';

//样式文件
import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';
import proDetailStyles from '../../styles/product/ProductDetail.less';

const Item = List.Item;
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2118-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1990-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

//资料上传
export default class OrgBasicInfoAdd extends React.Component{
  constructor() {
    super();
  }

  switchOnChange(key,value)
  {
    let {dispatch,formValue} = this.props;
    let payload  = {};
    payload[key] = value;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:payload
    });
  }

  longValueChange(value)
  {
    let {dispatch,formValue} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        certEndDate:value?moment('9999-12-31','YYYY-MM-DD'):zhNow
      }
    });
  }

  getOptions() {
  let {dispatch,formValue,form,formStorage,customer,detail} = this.props;
  let recommendOptions={};
  if(formValue.isfmanForMember)
    recommendOptions = {
      relationCust:{
        valueType:'selfSelect',
        title:'会员姓名',
        desc:'姓名/名称',
        extra:formValue.relationCustName,
        onClick:()=>{
          dispatch({
            type:'formStorage/fetchFormValue',
            payload:form.getFieldsValue()
          });
          dispatch(routerRedux.push({pathname:'/inputSelectCustomer',state:{
              mode:'selectCustomer',
              selectCustomer:{
                custID:formValue.relationCust
              },
              filter:{
                custClass:'02',
                custID: customer.custID?customer.custID:customer.busiID,
                isMemRec: 0
              },
              selectResult:(rowData)=>{
                dispatch({
                  type:'formStorage/fetchFormValue',
                  payload:{
                    relationCustName:rowData.custName,
                    relationCust:rowData.custID
                  }
                });
            },
          }
        }));
        }
      },
      IntroducerMobile: {
        required: true,
        trigger:'onBlur',
        validatorType:'phone',
        errMsg:'联系电话格式非法!',
        desc:'联系电话'
      },
      relation:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('orgRelation'),
        title:'与推荐人关系',
        desc:'推荐人/机构关系'
      }
    };

    let certEndDateStruct = {
      valueType:'date',
      title:'选择日期',
      mode:'date',
      extra:'可选,小于结束日期',
      desc:'执照失效时间',
      minDate:minDate,
      maxDate:maxDate,
    };
    if(formValue.long)
      certEndDateStruct = {
        valueType:'selfSelect',
        title:'证件到期日',
        desc:'证件到期日',
        extra:'长期有效',
        arrow:'empty'
      };
     let recordOptions = {};
     if(formValue.badRecords){
          recordOptions = {
              recordDesc:{
                required:true,
                trigger:'onBlur',
                validatorType:'length300',
                numberOfLines:0,
                errMsg:'不良诚信记录描述不能为空!',
                desc:'不良诚信记录描述'
              },
          };
      }


    return({
      space0:{valueType:'whiteSpace'},
      busiClass: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('busiClass'),
        title:'机构性质',
        desc:'机构性质'
      },
      certType: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('orgCertType'),
        title:'执照类型',
        desc:'执照类型'
      },
      runScope:{
          required:true,
          trigger:'onBlur',
          errMsg:'经营范围不能为空!',
          desc:'经营范围'
      },
      certCode: {
        required:true,
        type: 'text',
        desc:'执照号码'
      },
      long:{
        valueType:'switch',
        desc:'证件长期有效',
        justifyTrueValue:true,
        onChangeMethord:(value)=>this.longValueChange(value),
      },
      certStartDate: {
        require: true,
        valueType:'date',
        desc:'执照生效时间',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        minDate:minDate,
        maxDate:maxDate,
      },
      certEndDate:certEndDateStruct,
      busiYCheck: {
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('isPrivary'),
        title:'年检是否有效',
        desc:'年检是否有效'
      },
      space2:{valueType:'whiteSpace'},
      logingAddress: {
        required:true,
        type: 'text',
        desc:'注册地址'
      },
      messageAddress: {
        required:true,
        type: 'text',
        desc:'办公地址',
      },
      logingMoney: {
        required:true,
        type: 'text',
        desc:'注册资本(万元)'
      },
      space3:{valueType:'whiteSpace'},
      isfmanForMember:{
        required:true,
        valueType:'switch',
        desc:'是否海银会员推荐',
        justifyTrueValue:true,
        onChangeMethord:(value)=>this.switchOnChange('isfmanForMember',value)
      },
      ...recommendOptions,
      space5:{valueType:'whiteSpace'},
      badRecords:{
        required:true,
        valueType:'switch',
        desc:'有无不良诚信记录',
        onChangeMethord:(value)=>this.switchOnChange('badRecords',value)
      },
      ...recordOptions,
      space4:{valueType:'whiteSpace'},
      memPic:{
        required:true,
        valueType:'selfSelect',
        title:'上传附件',
        desc:'上传附件',
        extra:(!formStorage.certPic||formStorage.certPic.length<=0)?'证件资料未上传':'已上传',
        onClick:()=>{
              dispatch({
                type:'formStorage/fetchFormValue',
                payload:form.getFieldsValue()
              });
              dispatch(routerRedux.push({
                pathname:'/imageAdd',
                state:{custID:customer.custID?customer.custID:customer.busiID,
                      custClass:customer.custClass,
                      edit:detail?'edit':'',memMaterial: formStorage.memPic
                      }
              }));
            }
        }
    })
  }


  render() {
  const {dispatch,form,formValue,onChangeMethord,saveFormMethord,formFocus,formBlur} = this.props;
  const { getFieldProps } = this.props.form;
  return (
        <Form options={this.getOptions()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord}
         saveFormMethord={saveFormMethord} onFocus={formFocus} onBlur={formBlur} id={this.props.id}/>
    )
  }
}

// <div className={PerCusDetailStyles.basicInfoWrap} style={{paddingBottom: '1.334rem'}}>
//     <WhiteSpace style={{backgroundColor: '#efeff4',height: '0.267rem'}} />
// </div>
