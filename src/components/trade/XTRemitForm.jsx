//汇款信息页面（添加和修改）-王攀
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import Dic from '../../utils/dictionary';
import { List,InputItem,Toast,DatePicker,WhiteSpace} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Form from '../../utils/form';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import {convertCurrency} from '../../utils/formatUtils';

import PerCusDetailStyles from '../../styles/customer/PersonalCustomerDetail.less';//样式文件
import tradeStyles from '../../styles/trade/trade.less';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;

export default class XTRemitForm extends React.Component {
  constructor(props) {
     super(props);
  }

  longValueChange(value)
  {
    let { dispatch,formValue } = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        tradTime:value?moment('9999-12-31','YYYY-MM-DD','HH:mm: Z'):zhNow
      }
    });
  }



  onChangeMethord(item,value,name)
  {
  // console.log('----点击----',item,value,name);
    let { dispatch } = this.props;
    let payload = {};
    payload[item] = value;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'remitFormValue',
        newValue:payload
      }
    });
    dispatch(routerRedux.goBack());
  }

  saveFormMethord(payload)
  {
    let { dispatch,form } = this.props;
    dispatch({
      type:'formStorage/fetchNewState',
      payload:{
        key:'remitFormValue',
        newValue:payload
      }
    });
  }

  getOptions()
  {
    let { formValue,form,dispatch,orderInfo,deleteRemitInfoMethord,location} = this.props;
    let data = location.state.orderInfo;
    let CardNo = location.state.remitData;
    if(!formValue)
     formValue = {};
    console.log('lendCardNo======',orderInfo);
    return ({
      // capiSeq:{
      //   required:true,
      //   type:'text',
      //   trigger:'onBlur',
      //   desc:'流水号'
      // },
      custName:{
        valueType:'selfSelect',
        title:'姓名',
        desc:'姓名',
        extra:formValue.custName,
        arrow:'empty'
      },
      // custName:{
      //   required:false,
      //   type:'text',
      //   validatorType:'name',
      //   desc:'姓名',
      //   otherProps:{
      //     disabled:true
      //   }
      // },
      lendCardNo:{
        valueType:'selfSelect',
        title:'汇款人账号',
        desc:'汇款人账号',
        extra:formValue.lendCardNo==undefined?CardNo.lendCardNo:formValue.lendCardNo,
        onClick:()=>{
          dispatch(routerRedux.push({
            pathname: '/bankCardManage',
            state: {
              custId: orderInfo.custId,
              filterArgs:{
                cardClass: 0,
                recStat:'1'
              },
              mode:'selectCustomerAccount',
              data:{
                id: orderInfo.custId,
                tradCode: orderInfo.tradCode,
                orderNo:orderInfo.orderNo,//订单编号
                custName:orderInfo.custName,
                certType:data.certType,
                certNo:data.certNo,
              }
            }
          }));
        }
      },
      // borrCardNo:{
      //   required:true,
      //   valueType:'selfSelect',
      //   title:'收款人账号',
      //   desc:'收款人账号',
      //   extra:formValue.borrCardNoDesc,
      //   onClick:()=>{
      //     dispatch(routerRedux.push({
      //       pathname: '/PayeeAccount',
      //       state: {
      //         prodId: orderInfo.prodId,
      //         selectValue:formValue.borrCardNo
      //       }
      //     }));
      //   }
      // },
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
      amount:{
        required:true,
        validatorType:'float',
        type:'float',
        errMsg:'汇款金额非法!',
        desc:'汇款金额',
      },
      amtMark:{
        valueType:'selfSelect',
        desc:'大写金额',
        extra:convertCurrency(formValue.amount)?convertCurrency(formValue.amount):'金额非法',
        arrow:'empty'
      },
      space0:{valueType:'whiteSpace'},
      tradTime:{
        valueType:'date',
        desc:'汇款时间',
        title:'选择日期',
        mode:'datetime',
        required: true,
        format:'YYYY-MM-DD HH:mm:ss',
        extra:'选择汇款时间',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        errMsg:'请选择预计汇款日期!',
    },
    space1:{valueType:'whiteSpace'}
    });
  }

  render()
  {
    let { dispatch,formValue,form,deleteRemitInfoMethord,location} = this.props;
    const { getFieldProps,getFieldError } = this.props.form;
    console.log('==121===223',location.state.remitData);
    // formValue = custInfo;
    const titleProps = {title: '汇款信息'};
    return(
      <div className={tradeStyles.contractForm}>
        <div>
          <Form options={this.getOptions()} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={this.onChangeMethord.bind(this)}
            saveFormMethord={this.saveFormMethord.bind(this)} />
        </div>
        {
          this.props.showDelete?(<div>
              <p className={tradeStyles.remitAddBtn} onClick={deleteRemitInfoMethord}>删除汇款信息</p>
          </div>):<div />
        }
      </div>
      )
  }
};
