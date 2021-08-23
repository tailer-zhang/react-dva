//交易 驳回修改 认购驳回修改
import React,{ Component,PropTypes } from 'react';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import Title from '../../components/product/Title';
import { List,WhiteSpace,Tabs,InputItem,DatePicker,Toast } from 'antd-mobile';
import Dic from '../../utils/dictionary';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {decryptStr} from '../../utils/createEncrypt';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import {validateValue,exceptSpecialType} from '../../utils/ValidateType';
import Form from '../../utils/form';

import rebutStyles from '../../styles/trade/rebut.less';
import tradeStyles from '../../styles/trade/trade.less';//样式文件
import {convertCurrency} from '../../utils/formatUtils';
import DataImg from './DataImg';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2099-12-31 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2000-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const birthDayMinDate = moment('1900-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('23:59 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:00 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;


export default class ContInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  longValueChange(value)
  {
    let {dispatch,formValue} = this.props;
    dispatch({
      type:'formStorage/fetchFormValue',
      payload:{
        long:value,
        tradTime:value?moment('9999-12-31','YYYY-MM-DD'):zhNow
      }
    });
  }

  getOptions0()
  {
    let contOption = {};
    let { formValue } = this.props;
    var show = formValue.mgrSysCode === '2002' ? true : false
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
      remitDate:{
        valueType:'date',
        desc:'申请日期',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        disabled:formValue.long,
        minDate:minDate,
        maxDate:maxDate,
        required:'true',
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
        required:'true',
        type:'text',
        validatorType:'integer',
        type:'integer',
        errMsg:'汇款金额输入非法!',
        desc:'交易金额'
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
      },
      space3:{valueType: show ?'whiteSpace':'none'},
      bank:{
        valueType: show ?'bankToChange':'none',
        desc:'开户行',
        type:'text',
        changeValue: formValue.bankName
      }
    });
  }
  getOptions1()
  {
    let { formValue,from,onChangeMethord,dispatch,tradeForm,formStorage} = this.props;
    return ({
      operator:{
          required:true, //机构客户时比传   判断是否是机构客户
          desc:'姓名',
          title:'经办人姓名',
          type:'text',
        },
        operCertType:{
          required:true, //同上
          desc:'证件类型',
          valueType:'select',
          type:Dic.fetchDicList('certType'),
        },
        operCertNo:{
          required:true,//同上
          desc:'证件号码',
          type:'text',
          title:'证件号码'
        },
    });
  }
  getOptions2()
  {
    let { orderInfo} = this.props;
    console.log('orderInfo2222222',orderInfo)
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

  render(){
    const {dispatch,form,formValue,onChangeMethord,onFocus,onBlur,onChange,custRegisterFileList,orderInfo} = this.props
    const { getFieldProps,getFieldError } = this.props.form;
    console.log('this.propsnnnnnn',formValue);
    return(
      <div>
        <div className={rebutStyles.redeemUser}>
          <section>
            <p>合同编号</p>
            <p>产品名称</p>
            <p>产品类别</p>
            <p>客户名称</p>
            <p>证件类型</p>
            <p>证件号码</p>
            <p>交易类型</p>
            <p>预约金额(人民币)</p>
            <p>预约到期</p>
          </section>
          <section>
            <p>{formValue.contNo}</p>
            <p>{formValue.prodName}</p>
            <p>{formValue.prodExpiName}</p>
            <p>{formValue.custName}</p>
            <p>{Dic.fetchDicValue('certType',formValue.certType)}</p>
            <p>{formValue.certNo}</p>
            <p>{Dic.fetchDicValue('tradCode',formValue.tradCode)}</p>
            <p>{formValue.resvAmt}</p>
            <p>{formValue.expiDate}</p>
          </section>
        </div>
        <div>
          <Form options={this.getOptions0()} onFocus={onFocus} onBlur={onBlur} onChange={onChange} dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} />
          {
            formValue.custType=='0'?(
                <div>
                  <List.Item style={{backgroundColor:'#efeff4'}}>经办人信息</List.Item>
                  <Form options={this.getOptions1()} onBlur={onBlur} onFocus={onFocus}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} />
                </div>
            ):<div />
          }
          {
            orderInfo.isNeedRegister ==='1'?(
              <Form options={this.getOptions2()} onBlur={onBlur} onFocus={onFocus}  dispatch={dispatch} formValue={formValue} form={form} onChangeMethord={onChangeMethord} />
            ):<div />
          }
          {orderInfo.isNeedRegister ==='1'&& orderInfo.registerFlag && orderInfo.registerFlag === '1' ? <DataImg dataSource={custRegisterFileList} /> :
            <div/>
          }
        </div>
     </div>
    );
  }
}
