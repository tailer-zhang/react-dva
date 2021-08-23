//缴费记录 赵博文

import React,{Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { List,InputItem,TextareaItem,DatePicker,WhiteSpace,Toast } from 'antd-mobile';
import Titles from '../../components/product/Titles';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import styles from '../../styles/trade/tradePayRecord.less';
import Form from '../../utils/form';
import Dic from '../../utils/dictionary';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2118-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('1990-01-01 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);
const gmtNow = moment().utcOffset(0);

const Item = List.Item;
class AddPayRecord extends React.Component{
  constructor(props) {
    super(props);
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

  getOptions() {
    return({
      payAmt: {
        required:false,
        type: 'text',
        desc:'缴费金额'
      },
      payCurType: {
        required:false,
        valueType:'select',
        type:Dic.fetchDicList('payCurType'),
        title:'缴费币种',
        desc:'缴费币种'
      },
      payDate: {
        valueType:'date',
        desc:'打款日期',
        title:'选择日期',
        mode:'date',
        extra:'可选,小于结束日期',
        minDate:minDate,
        maxDate:maxDate,
      },
      remark: {
        required:false,
        type: 'text',
        desc:'备注'
      }
    })
  }

  render() {
    let {dispatch,form,location,tradeSafe,formStorage} = this.props;
    let { getFieldProps,getFieldError} = form;
    let {formValue} = formStorage;
    console.log('formValue',formValue);
    let formValue1 = formValue.formValue1;
    console.log('formValue1',formValue1);
    const titleProps = {title: '缴费记录'};


    return (
      <div style={{position: 'relative'}}>
        <Titles {...titleProps}>
          <p className={styles.cancel} onClick={()=>dispatch(routerRedux.goBack())}>取消</p>
          <p className={styles.submit} onClick={()=>{
            form.validateFields((error,value)=>{
              console.log('----------error',error,value);
              if(error==null||(!error.payAmt&&!error.payCurType&&!error.payDate&&!error.remark))
              {
                 let saveValue = {
                   ...value,
                   payDate: value.payDate.format('YYYY-MM-DD'),
                   state: 'add',
                   version: dataObj.version
                 };

                 dispatch({
                   type:'formStorage/fetch',
                   payload:{
                     popValue:{list: [saveValue]},
                   }
                 });
                 dispatch(routerRedux.goBack());
              }
              else {
                Toast.fail('输入参数中存在错误!',2);
              }
            });
          }}>完成</p>
        </Titles>
        <div style={{marginTop: '1.72rem'}}>
          <List>
            <Form options={this.getOptions()}  dispatch={dispatch} formValue={formValue1} form={form} onChangeMethord={this.onChangeMethord.bind(this)} saveFormMethord={this.saveFormMethord.bind(this)}/>
          </List>
        </div>
        <WhiteSpace style={{backgroundColor: '#efeff4',height: '52px'}}/>
        <p className={styles.record}>删除缴费记录</p>
      </div>
    )
  }
}

function connectPayRecord({tradeSafe,formStorage}) {
  return {tradeSafe,formStorage}
}

export default connect(connectPayRecord)(createForm()(AddPayRecord));
