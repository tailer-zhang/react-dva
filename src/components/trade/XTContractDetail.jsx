import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Form from '../../utils/form';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';
import { List,InputItem,Toast,DatePicker,WhiteSpace} from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {decryptStr} from '../../utils/createEncrypt';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import XTContractForm from './XTContractForm';//合同信息录入表单组件
import {convertCurrency} from '../../utils/formatUtils';
import DataImg from '../../components/share/DataImg';

import tradeStyles from '../../styles/trade/trade.less';//样式文件

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;

export default class XTContractDetail extends React.Component {
  constructor(props) {
     super(props);
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


  longValueChange(value)
  {
    let { dispatch,formValue,formStorage } = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        tradTime:value?moment('9999-12-31','YYYY-MM-DD','HH:mm: Z'):zhNow
      }
    });
  }

  seveTemporary(value)
  {
    let { dispatch,formValue } = this.props;
    let saveValue =
     dispatch({
       type:'formStorage/fetchFormValue',
       payload:{...formValue}
     });
  }
  getOptions0()
  {
    let { formValue,onChangeMethord,dispatch} = this.props;
    let subcAmount = {}
    if(formValue.callFlag == '1'){
       subcAmount={
         subcAmount:
           {
             required: true,
             validatorType: 'integer',
             disabled: formValue.callFlag == '1' && formValue.addiOrd == 'N' ? false : (formValue.callFlag == '1' && formValue.addiOrd == 'Y'?true:false),
             trigger: 'onBlur',
             desc: '认筹金额',
             type: 'integer',
             errMsg: '认筹金额输入非法!',
             extra: formValue.subcAmount ? formValue.subcAmount : ''
           }
       }
    }
    return ({
    space0:{valueType:'whiteSpace'},
      remitDate:{
        valueType:'date',
        desc:'申请日期',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:true,
      },
      space1:{valueType:'whiteSpace'},
      currType:{
        required:true,
        valueType:'select',
        type:Dic.fetchDicList('moneyType'),
        title:'币种',
        desc:'币种',
        disabled:true,
        otherProps:{
          arrow:undefined
        }
      },
      reqAmt:{
        required:true,
        // type:'text',
        validatorType:'integer',
        trigger:'onBlur',
        type:'integer',
        errMsg:'汇款金额输入非法!',
        desc:'交易金额',
      },
      ...subcAmount,
      amtMark:{
        valueType:'selfSelect',
        desc:'大写金额',
        extra:convertCurrency(formValue.reqAmt)?convertCurrency(formValue.reqAmt):'金额超过限制',
        arrow:'empty'
      },
      space2:{valueType:'whiteSpace'},
      fee:{
        desc:'手续费',
        type:'text',
        title:'手续费',
      }
    });
  }

  getOptions1()
  {
    let { onChangeMethord,dispatch,formValue} = this.props;
    return ({
      operator:{
          required:true,
          desc:'姓名',
          title:'经办人姓名',
          type:'text',
          trigger:'onBlur',
          validatorType:'name',
          errMsg:'经办人姓名非法!',
        },
        operCertType:{
          required:true,
          desc:'证件类型',
          valueType:'select',
          type:Dic.fetchDicList('certType'),
          onChangeMethord:onChangeMethord
        },
        operCertNo:{
          required:true,
          desc:'证件号码',
          type:'text',
          title:'证件号码'
        },
      space2:{valueType:'whiteSpace'},
    });
  }
  getOptions2()
  {
    let { orderInfo} = this.props;
    console.log('orderInfo444444',orderInfo)
    return ({
      space1:{valueType:'whiteSpace'},
      isRegAuth: {
        valueType: 'selfSelect',
        desc: '是否已完成登记注册身份验证',
        extra:orderInfo.isNeedRegister ==='1' && orderInfo.registerFlag && orderInfo.registerFlag === '1' ? '是': '否',
        arrow: 'empty'
      },
      space2:{valueType:'whiteSpace'},
    });
  }

  render()
  {
    let { dispatch,formValue,tradeForm,trade,form,onChangeMethord,custRegisterFileList,orderInfo,onBlur,onFocus} = this.props;
    console.log('this.props555',this.props)
    const { getFieldProps,getFieldError } = this.props.form;
    return(
      <div className={tradeStyles.remitWrap}>
        <div className={tradeStyles.contractInputInfo}>
        <Form options={this.getOptions0()} dispatch={dispatch} onBlur={onBlur} onFocus={onFocus}  formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)} />
        </div>
        {
          orderInfo.custType=='0'?(
              <div>
                <List.Item style={{backgroundColor:'#efeff4'}}>经办人信息</List.Item>
                <Form options={this.getOptions1()} onBlur={onBlur} onFocus={onFocus}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)} />
              </div>
          ):<div />
        }
        {
          orderInfo.isNeedRegister ==='1'?(
            <Form options={this.getOptions2()} onBlur={onBlur} onFocus={onFocus}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)} />
          ):<div />
        }
        {orderInfo.isNeedRegister ==='1'&& orderInfo.registerFlag && orderInfo.registerFlag === '1' ? <DataImg dataSource={custRegisterFileList} /> :
          <div/>
        }
      </div>)
  }
};
